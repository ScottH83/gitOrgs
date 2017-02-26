// 1 iife
(function() {
    // 2 strict mode in javascript
    "use strict";
    // 3 makes functions available after "document" load
    $(document).ready(() => {


        // 4
        const gitOrgModule = function() {
            const apiKey = '01ca0b9658eb146f2ea950a399ae045c2e098570';
            const searchUser = document.querySelector('userSearch');
            const resultButton = document.querySelector('.getUserSearch');
            let userName = '';

            class GitHubOrg {
                // creating the object will become what is passed into the template(organization and image)
                constructor(gitObj) {
                    this.image = gitObj.avatar_url;
                    this.title = gitObj.login;
                    this.build();
                    // this targets the object then builds
                }

                // build template to
                build() {
                    // where the template is going to be
                    const source = $('#gitOrgTemplate').html();
                    // tells
                    const template = Handlebars.compile(source);
                    // substance of the template itself
                    const context = {
                        image: this.image,
                        title: this.title
                    };
                    // this variable will be used to plug for the actual templayeing
                    const html = template(context);
                    // variable which is a div with a class of gitObjContainer this will contain the image and title of the organization
                    let container = $('<div>').attr('class', 'gitObjContainer');
                    // variable which is a img with a source of this.image which is defined in the contructor. this will be added to gitObjContainer using appendTo method.
                    let image = $('<img>').attr('src', this.image).prependTo(container);
                    let title = $('<h1>').html(this.title).appendTo(container)

                }
            }

            function bindEvents() {
                getApiData(userName);
            }





            // function that connects the api with page using a ajax call
            function getApiData(userName) {
                // variable that defines parameters for the ajax call.
                const settings = {
                    // http method to use for request of (post, get, put).
                    'method': 'GET',
                    // contains url which request is sent.
                    'url': 'https://api.github.com/users/${userName}/orgs?api_key${apiKey}'

                };
                // ajax promise call response is what we get from the get request
                $.ajax(settings).then(function(response) {
                    if (response.length !== 0) {
                        for (let index = 0; index < response.length; index++) {

                        }
                    }


                });

            }

            // 5 runs on "document" load
            function init() {
                bindEvents();
            }
            // 6 ends function exec and specifies a value to be returned to function caller
            return {
                init: init
            };
        };
        // 4a.
        const gitOrg = gitOrgModule();
        // 5a. initiates gitOrg on "document" load
        gitOrg.init();

    });




})();
