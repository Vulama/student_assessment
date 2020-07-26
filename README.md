# student_assessment
Buckhill Student Assessment

I had a problem with CORS, so the whole app was built with the help of Moesif CORS Chrome extension. 

I have a solution that works without extension but it requires routing over a proxy server which can be really slow some times.

Soultion is to fetch data over proxy by using 
'https://cors-anywhere.herokuapp.com/' + API address,
in my case that would be:
'https://cors-anywhere.herokuapp.com/http://api.hnb.hr/tecajn/v1'

In the repo there is PHP file that I created at the start of the project beacause I didn't read the assignment carefully.
This method also works without extension, and also works without proxy therefore it is fast and efficient method but that is not what you have asked for.

