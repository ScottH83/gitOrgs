(function() {
    "use strict";


    $(document).ready(() => {
        const gitOrgModule = function() {
            const searchField = $('.searchBar');
            const gitOrgBtn = $('.getUserOrg');
            const apiKey = '01ca0b9658eb146f2ea950a399ae045c2e098570';

            // const userName =;

            class GitOrg {
                constructor(gitObjs) {
                    // this.image = gitObjs.avatar_url;
                    this.login = gitObjs.login;
                    this.build();
                }
                build() {
                    const source = $('#gitOrgTemplate').html();
                    const template = Handlebars.compile(source);
                    const context = {
                        // image: this.image,
                        name: this.name
                    };
                    const html = template(context);
                    $('.org-display').append(html);
                }
            }

            function bindEvents() {
                getApiData(value);
                //
                //     $('.userSearch').on('submit', function() {
                //         event.preventDefault();
                //         console.log('shit');
                const value = event.target[0].value;
                //         getApiData(value);
                //         this.reset();
                //         return value;
                //     });
                //     $(gitOrgBtn).on('click', () => {
                //         getApiData(value);
                //         console.log('in');
                //     });
            }

            // function showGitOrgBtn() {
            //     $('.getUserOrg').on('click', function() {
            //         event.preventDefault();
            //         console.log('in');
            //     });
            // }

            function getApiData(query) {
                // this medthod encodes
                query = encodeURIComponent(query);
                const settings = {
                    'async': true,
                    'crossDomain': true,
                    'method': 'GET',
                    'url': `https://api.github.com/users/${query}/orgs?api_key=${apiKey}`

                };

                $.ajax(settings).then(function(response) {
                    new GitOrg(response.results);

                });
            }

            function init() {

                bindEvents();
            }
            return {
                init: init
            };
        };
        const gitOrg = gitOrgModule();
        gitOrg.init();
    });

})();
