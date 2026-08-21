package com.qa.taller.runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;

@CucumberOptions(
    features = "src/test/resources/features",
    glue = "com.qa.taller.steps",
    plugin = {"pretty", "summary"},
    monochrome = true
)
public class TestScenarios extends AbstractTestNGCucumberTests {
}
