# typescript-demo
A project to give a quick overview of the TypeScript language and some related technologies.
This is a presentation on TypeScript, implemented in TypeScrip.  It goes over the history of
TypeScript, outlines some core features of the language and demonstrates creating and testing
and application developed using TypeScript.


Quick Start
=============================================================================================
This project is intended to run with Visual Studio or Visual Studio code.  The can be
retrieved from the following location:
https://www.visualstudio.com/downloads/

The minimum version of TypeScript supported by this project is 2.1.*  After installing Visual
Studio, get the latest version of TypeScript.

https://www.microsoft.com/en-us/download/details.aspx?id=48593

This project also uses Node.js and NPM for package management.  Node.js can be acquired from:
https://nodejs.org/

Once Node.js is installed, be sure that node is in your machines path. From the command-line run:
npm install -g npm

This command ensures the latest version of NPM is installed on your machine.

Next, retrieve the source code for this project by cloning it from GitHub:
https://github.com/jp-wf/typescript-demo

Once you have the code, open a command line to where the repository was cloned and navigate to
TypeScriptDemo.  From there, execute the following command to install the required packages.
npm install

Optionally, you can install a light weight http server to host the application by retrieving the 
following package from NPM:
npm install http-server -g 

Once the packages have been installed, open the solution (or folder if using Visual Studio Code)
and build the solution.

Now that the project is built, you can either run it from within Visual Studio, or go back to the
command line and run the following command:
http-server

Using the http-server method allows you to add new files and folders to the project without having 
to stop your web server.


