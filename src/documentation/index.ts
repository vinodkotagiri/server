import { authPaths } from "./paths/authPaths";
import { userPaths } from "./paths/userPath";

export const docs={
  openapi:"3.0.0",
  info:{
    title:"Project Management",
    version:"1.0.0",
    description:"API documentation for Project Management"
  },
  servers:[
    {
      url:`http://localhost:${process.env.PORT || 3000}`,
      description:"Local server"
    },
    {
      url:`https://project-management-server.onrender.com`,
      description:"Production server"
    }
  ],
  paths:{
    ...authPaths,
    ...userPaths
  },
  tags:[
    {
      name:"Auth",
      description:"Authentication related endpoints"
    },
    {
      name:"User",
      description:"User related endpoints"
    }
  ]
}