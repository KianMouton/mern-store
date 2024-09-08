Eccomerce Store
#### Video Demo: https://youtu.be/u_KrmpF0Epk
#### Description: this is a Eccomerce Store project built using the MERN Stack (Mongo, Express, React, Node,js)

This project is a Eccomerce Store that I built using the MERN Stack.I used gsap for some of the animations notably in the navbar and front page.The user can view products and then add the items they want to buy to their cart.on the products page the user can filter the item type that they are looking for.after the user has added their desired items to the cart the user selects the size and quantity of the item they would like to buy.

The user can the click on the Pay for all button where they are then prompted to input a phone number that will then be used to contact the user on updates for their order.The number is then validated and in the case that it is not a valid number the user is repromted to input a valid number.The user is the redirected to a Yoca pay portal where they input their payment information.

The server then compares the original response sent to the user and the information that the yoco webhook sends the server when the payment information is entered if the payment id's match the payment is verified and a automated email is send to the me or whoever needs to see the cart info to then be able to proceed to prepairing the order.

### some design choices explained
because the website is currently in production I use a tunneling service (ngrok) to forward network requests by the yoco api.
nodemailer is used to send automated emails.
react-router is used to route the website pages without prompting a reload of the website.
