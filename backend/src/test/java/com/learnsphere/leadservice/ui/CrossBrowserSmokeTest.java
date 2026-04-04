package com.learnsphere.leadservice.ui;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.safari.SafariOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CrossBrowserSmokeTest {

    private static WebDriver driver;
    private static WebDriverWait wait;
    private static String baseUrl;

    @BeforeAll
    static void setUp() {
        String browser = System.getProperty("browser", "chrome").toLowerCase();
        baseUrl = System.getProperty("baseUrl", "http://127.0.0.1:8080");
        driver = createDriver(browser);
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        driver.manage().window().setSize(new Dimension(1440, 1200));
    }

    @AfterAll
    static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void homePageShowsPrimaryNavigation() {
        driver.get(baseUrl + "/");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".nav")));

        assertTrue(driver.getPageSource().contains("Learn trending tech skills with career-focused courses"));
        assertTrue(driver.findElement(By.cssSelector(".logo")).isDisplayed());
        assertTrue(driver.findElement(By.id("navCourseSearch")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector(".categories-wrap .categories-btn")).isDisplayed());
        assertTrue(driver.findElement(By.cssSelector(".courses-wrap .categories-btn")).isDisplayed());
    }

    @Test
    void coursesPageShowsAvailableCatalog() {
        driver.get(baseUrl + "/courses");

        wait.until(ExpectedConditions.or(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".course-table")),
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".grid"))
        ));

        assertTrue(driver.getPageSource().contains("Browse all available courses"));
        assertTrue(driver.getPageSource().contains("Terraform and Infrastructure as Code"));
    }

    @Test
    void adminCoursesPageShowsFormAndCourseList() {
        driver.get(baseUrl + "/admin/courses");

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("adminCourseListBody")));

        assertTrue(driver.getPageSource().contains("Add or update course content"));
        assertTrue(driver.getPageSource().contains("Available Courses"));

        List<WebElement> editButtons = driver.findElements(By.xpath("//button[normalize-space()='Edit']"));
        assertFalse(editButtons.isEmpty());
    }

    private static WebDriver createDriver(String browser) {
        return switch (browser) {
            case "edge" -> {
                EdgeOptions options = new EdgeOptions();
                options.addArguments("--headless=new", "--disable-gpu", "--window-size=1440,1200");
                yield new EdgeDriver(options);
            }
            case "firefox" -> {
                FirefoxOptions options = new FirefoxOptions();
                options.addArguments("-headless");
                yield new FirefoxDriver(options);
            }
            case "safari" -> {
                SafariOptions options = new SafariOptions();
                yield new SafariDriver(options);
            }
            default -> {
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--headless=new", "--disable-gpu", "--window-size=1440,1200");
                yield new ChromeDriver(options);
            }
        };
    }
}
