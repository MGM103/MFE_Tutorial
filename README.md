# Introduction to Micro Frontends

## What is a Micro Frontend?
Micro frontends introduce mircoservice development principles to frontend applications.<sup>[1]</sup>  
Using this architecture, teams can independently build and deploy "child" applications and these will be combined in a "parent" application that acts as a container grouping the applications together into one single usable entity.<sup>[1]</sup>  
The "child" applications can also share different components between one another also.<sup>[3]</sup>

## Why use Micro Frontends?  
*Autonomous Teams*  
Microservice architecture is centered around small units of functionality that can be deployed independently. Using MFEs small teams can concentrate effort on a independent segment of functionality and not worry about breaking other aspects of a website or rely on other teams to make changes to accomodate new features. Each team is therefore an expert in their domain.<sup>[1]</sup>  

*Maintainability*  
Traditionally frontends have been monolithic. Over time more changes are introduced to the application and it becomes progressively harder to maintain as multiple features may be affected by maintenance changes.<sup>[2]</sup>  
Isolation of front end logic into separate applications ensures maintenance is more simple, as it can be applied only to the logic that is required to change and any changes won't affect other applications.

*Speed of Delivery*  
Communication overhead is drastically reduced between the frontend team. Updates to specific components in the child applications will be automatically reflected in the host and deployment of the child can happen independent of other teams. Additionally, more work can be done in parallel between the different teams ensuring quicker delivery.<sup>[3]</sup> 

*Reusability of Independent Artifacts*  
Independent artifacts produced by a team can seamlessly be used into multiple places on the website. This artifact must adhere to the MFE standards agreed upon by the MFE teams for this to be feasible.<sup>[3][4]</sup>

*Technology Agnosticism*  
This architecture permits each of the child applications te be created in whichever tech stack the team deems best, providing they maintain the MFE standard and interface contract. This is desirable as teams function autonomously in this architecture. This means that the children applications can be a combination of react, vue, svelte, etc and then combined in the host application.<sup>[3][4]</sup>

*Scalable Teams*  
As MFE teams are small and focussed on a mutually exclusive unit of frontend logic, new small teams can be formed to build new features scalling the work horizontally.<sup>[1]</sup> 

## Micro Frontend Drawbacks
*Host/Remote (Parent/Child) Integration*  
The host or container application must connect to all the children application artifacts and display them correctly to appear as a single monolithic application. Additionallly, the need to have comprable performance to a monolithic application despite these integrations.<sup>[1]</sup> 

*Operational Overhead*
Infrastructure for deploying and hosting applications is needed for multiple teams as opposed to a single frontend team.<sup>[1]</sup> 

*Consistent User Experience*
Teams must agree upon standards for style to ensure that there is consistency to the UI/UX across the different child applications and not feel disjointed.

## How to build Micro Frontends?
The most common way to create MFEs is by using either Single-Spa or Webpack 5's Module Federation.

*Single-Spa*  
Single-spa is a framework for bringing together multiple JavaScript microfrontends in a frontend application.<sup>[5]</sup> You can find the link to the documentation [here](https://single-spa.js.org/docs/getting-started-overview).

*Module Federation*  
Provides run time sharing of components between different applications, facilitating single page applications composed of multiple applications.<sup>[6]</sup>  
You can find the link to the documentation [here](https://webpack.js.org/concepts/module-federation/).

## Project Overview
This project details how to build a basic micro frontend using Webpack 5's module federation. In this project you will create three react apps, two child applications with componets that the host or container application will consume to give the user the impression that they are interacting with a single page applicaiton.  
We will the deploy the MFE using docker.
### Pre-requisites
This tutorial requires the following:
- [VS code](https://code.visualstudio.com/download)
- [Node JS](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [GitHub Account](https://github.com/join)
## Sources
[1] https://aws.amazon.com/blogs/architecture/micro-frontend-architectures-on-aws/  
[2] https://www.sitepoint.com/micro-frontend-architecture-benefits/  
[3] https://levelup.gitconnected.com/micro-frontends-what-why-and-how-bf61f1f0a729  
[4] https://www.youtube.com/watch?v=w58aZjACETQ&t=202s  
[5] https://single-spa.js.org/docs/getting-started-overview/  
[6] https://www.youtube.com/watch?v=x22F4hSdZJM&t=17s
