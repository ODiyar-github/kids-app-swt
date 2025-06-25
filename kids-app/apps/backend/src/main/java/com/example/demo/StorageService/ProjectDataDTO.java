package com.example.demo.StorageService;

import com.example.demo.entity.Event;
import com.example.demo.entity.Feedback;
import com.example.demo.entity.User;


import java.util.List;
 public class ProjectDataDTO {
   public String _id;
   public String _rev;
   public List<User> userData;
   public List<Event> eventData;
   public List<Feedback> feedBackAppData;


 }
