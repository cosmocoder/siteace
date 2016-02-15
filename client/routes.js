Router.configure({
    layoutTemplate: 'main',  // this template will be shown in all pages/routes
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/details/:_id', {
    name: 'detailsPage',
    template: 'details_page',
    data: function() {
        return Websites.findOne({_id: this.params._id});
    },
    waitOn: function() {
        return Meteor.subscribe('websites', this.params._id);
    }
});