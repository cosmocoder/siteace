Meteor.publish('websites', function(siteId) {
    if( siteId ) {
        return Websites.find({_id: siteId});
    }
    else {
        return Websites.find();
    }
});