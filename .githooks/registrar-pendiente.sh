#!/usr/bin/env bash
#
# Registra en PENDIENTE-RESINCRONIZAR.md los commits que tocan zonas cuya
# documentacion puede quedar desfasada. Lo invoca el hook post-commit.
#
#   registrar-pendiente.sh            registra HEAD
#   registrar-pendiente.sh --rebuild  reconstruye el fichero entero desde la
#                                     marca de agua
#
# El fichero senal es una CACHE y no se versiona. La verdad persistente es
# .resync-watermark, que si esta en git: si el fichero se pierde, --rebuild lo
# reconstruye identico. Por eso su ausencia significa "todo al dia" y no
# "alguien lo borro".
#
# Registra HECHOS (que commit toco que zona), nunca consecuencias: que
# documentos quedan obsoletos lo calcula cascada.js de S-16, y tenerlo en dos
# sitios seria tener un sitio que miente.

set -u

RAIZ="$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
cd "$RAIZ" 2>/dev/null || exit 0

MARCA_F=".resync-watermark"
SENYAL="PENDIENTE-RESINCRONIZAR.md"

# Primera linea util de la marca de agua: el SHA del ultimo cierre.
marca() {
  [ -f "$MARCA_F" ] || return 1
  grep -v '^[[:space:]]*#' "$MARCA_F" | grep -v '^[[:space:]]*$' | head -1 | tr -d '[:space:]'
}

# Clasifica los ficheros que llegan por stdin en zonas documentales.
# Nada mas cuenta: un commit en data/, dashboard/ o un fichero suelto de la
# raiz no desincroniza ningun DOC-nn.
zonas() {
  app=''; spe=''; doc=''; pru=''
  while IFS= read -r f; do
    case "$f" in
      client/*|server/*|package.json) app='app' ;;
      specs/*)                        spe='specs' ;;
      docs/*|registro-ids.json)       doc='docs' ;;
      automation/*)                   pru='pruebas' ;;
    esac
  done
  out=''
  for z in "$app" "$spe" "$doc" "$pru"; do
    [ -n "$z" ] && out="${out:+$out, }$z"
  done
  printf '%s' "$out"
}

cabecera() {
  cat > "$SENYAL" <<'MD_EOF'
# Pendiente de resincronizar

Este fichero existe **solo si hay cambios sin revisar**. Si no existe, toda la
documentacion estaba al dia en el ultimo cierre.

Lo escribe el hook `post-commit`; lo borra `S-16 · cascada-obsolescencia` al
cerrar una onada con 0 obsoletos. No se edita a mano ni se versiona: es una
cache de `git log <marca>..HEAD`, reconstruible con
`.githooks/registrar-pendiente.sh --rebuild`.

Registra **hechos**, no consecuencias. Que documentos quedan obsoletos lo
calcula `cascada.js`; aqui solo consta que ha pasado algo que merece mirarlo.

MD_EOF
  printf 'Ultima resincronizacion completa: `%s`\n\n' "${1:-—}" >> "$SENYAL"
  printf '| Commit | Fecha | Zona | Ficheros |\n|---|---|---|---|\n' >> "$SENYAL"
}

registrar() {
  sha="$1"
  ficheros="$(git diff-tree --no-commit-id --name-only -r "$sha" 2>/dev/null)"
  [ -n "$ficheros" ] || return 0

  zs="$(printf '%s\n' "$ficheros" | zonas)"
  [ -n "$zs" ] || return 0

  corto="$(git rev-parse --short "$sha")"
  fecha="$(git log -1 --format=%ad --date=short "$sha")"

  n="$(printf '%s\n' "$ficheros" | wc -l | tr -d ' ')"
  lista="$(printf '%s\n' "$ficheros" | head -3 | tr '\n' '|' | sed 's/|$//; s/|/, /g')"
  [ "$n" -gt 3 ] && lista="$lista, +$((n - 3)) mas"

  [ -f "$SENYAL" ] || cabecera "$(marca || true)"

  pat="$(printf '| `%s` |' "$corto")"
  grep -qF "$pat" "$SENYAL" && return 0          # ya registrado

  printf '| `%s` | %s | %s | %s |\n' "$corto" "$fecha" "$zs" "$lista" >> "$SENYAL"
}

if [ "${1:-}" = "--rebuild" ]; then
  m="$(marca || true)"
  rm -f "$SENYAL"
  if [ -n "$m" ] && git cat-file -e "${m}^{commit}" 2>/dev/null; then
    rango="${m}..HEAD"
  else
    rango="HEAD"
    [ -n "$m" ] && echo "Aviso: la marca '$m' no esta en el historial; se recorre todo." >&2
  fi
  for c in $(git log --format=%H --reverse "$rango" 2>/dev/null); do
    registrar "$c"
  done
  if [ -f "$SENYAL" ]; then
    echo "Reconstruido: $SENYAL"
  else
    echo "Nada pendiente desde ${m:-el inicio}: no se ha creado $SENYAL"
  fi
  exit 0
fi

registrar "$(git rev-parse HEAD)"
exit 0
