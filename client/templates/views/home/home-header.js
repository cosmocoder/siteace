Template.home_header.events({
    'click .site-search a': function(event, template) {
        event.preventDefault();
        template.$('span.site-search').toggleClass('active');

        if( !template.$('span.site-search').hasClass('active') ) {
            template.$('input').val('');
            Session.set('searchText', null);
        }
    },

    'keyup input': function(event) {
        var text = event.target.value;
        Session.set('searchText', text);
    },

    'click .js-toggle-website-form': function(event) {
        event.preventDefault();
        Modal.show('website_form');
    }
});