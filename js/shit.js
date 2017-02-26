(function() {
    "use strict";
    $(document).ready(() => {
        const gitOrgModule = function() {
            const noOrg = document.querySelector('.noGitOrg');
            const apiKey = '01ca0b9658eb146f2ea950a399ae045c2e098570';

            class GitOrg {
                constructor(details) {
                    this.image = details.avatar_url;
                    this.title = details.login;
                    this.build();
                }
                build() {
                    const source = $('#gitOrgTemplate').html();
                    const template = Handlebars.compile(source);
                    const context = {
                        image: this.image,
                        title: this.title
                    };
                    const html = template(context);
                    $('.org-display').append(html);
                }
            }

            function resetList() {
                $('.gitOrgObj').remove();
                $('.org-display div').remove();
            }

            function bindEvents() {
                $('.searchBar').on('submit', function() {
                    event.preventDefault();
                    let value = event.target[0].value;
                    getApiData(value);
                    resetList();
                    this.reset();
                    return value;
                });

                function getOrgResults() {
                    $('.getUserOrg').on('click', function() {
                        event.preventDefault();
                    });
                }
            }



            function getApiData(query) {
                query = encodeURIComponent(query);
                const settings = {
                    'async': true,
                    'crossDomain': true,
                    'method': 'GET',
                    'url': `https://api.github.com/users/${query}/orgs?api_key=${apiKey}`
                };
                $.ajax(settings).then(function(response) {
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            new GitOrg(response[i]);
                        }

                    } else $('.org-display').html('<div class="noGitOrg"> This user is not associated with any organizations </div>');
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
