package com.example.demo.Model;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Feedback {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long feedbackId;

  private String title;
  private String review;

  private int rating;

  private Date createdAt;
  private String reply;

  @ManyToOne
  private User user;

  public Feedback() {
  }

  public Feedback(String title, String review, int rating, Date createdAt, String reply, User user) {
    this.title = title;
    this.review = review;
    this.rating = rating;
    this.createdAt = createdAt;
    this.reply = reply;
    this.user = user;
  }

  public Long getFeedbackId() {
    return feedbackId;
  }

  public void setFeedbackId(Long feedbackId) {
    this.feedbackId = feedbackId;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getReview() {
    return review;
  }

  public void setReview(String review) {
    this.review = review;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public String getReply() {
    return reply;
  }

  public void setReply(String reply) {
    this.reply = reply;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  @Override
  public String toString() {
    return "Feedback{" +
      "feedbackId=" + feedbackId +
      ", title='" + title + '\'' +
      ", review='" + review + '\'' +
      ", rating=" + rating +
      ", createdAt=" + createdAt +
      ", reply='" + reply + '\'' +
      ", user=" + user +
      '}';
  }


}
