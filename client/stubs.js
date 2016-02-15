Meteor.methods({
    upVote: function(siteId, upVotes) {
        check(siteId, String);
        check(upVotes, Number);

        var currentUser = Meteor.userId();

        if( !currentUser ) {
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        return Websites.update({_id: siteId}, {$set: {'votes.up': upVotes}});
    },

    downVote: function(siteId, downVotes) {
        check(siteId, String);
        check(downVotes, Number);

        var currentUser = Meteor.userId();

        if( !currentUser ) {
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        return Websites.update({_id: siteId}, {$set: {'votes.down': downVotes}});
    }
});