export interface NavSection {
  path: string;
  labelKey: string;
  implemented: boolean;
}

export const navSections: NavSection[] = [
  { path: '/clients', labelKey: 'nav.clients', implemented: true },
  { path: '/vehicles', labelKey: 'nav.vehicles', implemented: false },
  { path: '/peces', labelKey: 'nav.peces', implemented: false },
  { path: '/albarans', labelKey: 'nav.albarans', implemented: false },
  { path: '/factures', labelKey: 'nav.factures', implemented: false },
  { path: '/personal', labelKey: 'nav.personal', implemented: false },
  { path: '/nomines', labelKey: 'nav.nomines', implemented: false },
  { path: '/configuracio', labelKey: 'nav.configuracio', implemented: false },
];
