package com.learnsphere.leadservice.course;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer price;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String whyLearn;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String toolchainOverview;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String faqContent;

    public Course() {
    }

    public Course(String title, String description, Integer price, String whyLearn, String toolchainOverview, String faqContent) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.whyLearn = whyLearn;
        this.toolchainOverview = toolchainOverview;
        this.faqContent = faqContent;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getWhyLearn() {
        return whyLearn;
    }

    public void setWhyLearn(String whyLearn) {
        this.whyLearn = whyLearn;
    }

    public String getToolchainOverview() {
        return toolchainOverview;
    }

    public void setToolchainOverview(String toolchainOverview) {
        this.toolchainOverview = toolchainOverview;
    }

    public String getFaqContent() {
        return faqContent;
    }

    public void setFaqContent(String faqContent) {
        this.faqContent = faqContent;
    }
}
