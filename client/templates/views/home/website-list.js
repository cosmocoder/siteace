/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function() {
        var searchText = Session.get('searchText');

        if( searchText ) {
            return WebsitesIndex.search(searchText).fetch();
        }
        else {
            return Websites.find({}, {sort: {'votes.up': -1}});
        }
    }
});

Template.website_list.onCreated(function() {
    this.subscribe('websites');
});


var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Template.website_item.helpers({

    // get the formatted date for when the site was added
    date_added: function() {
        var date = new Date(this.createdOn);
        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    },

    // get up votes
    upVotes: function() {
        return this.votes.up;
    },

    // get down votes
    downVotes: function() {
        return this.votes.down;
    }
});


/////
// template events
/////

Template.website_item.events({
    'click .js-upvote': function(event) {
        event.preventDefault();

        if( !Meteor.userId() ) {
            var $alert = $('#vote-alert'),
                $row = $alert.closest('div.row'),
                rowOffset = $row.offset();

            $alert.css({width: $row.width(), left: rowOffset.left, top: rowOffset.top});
            $alert.fadeIn(400).delay(2000).fadeOut(400);
            return;
        }

        var siteId = this._id,
            upVotes = this.votes.up + 1;

        Meteor.call('upVote', siteId, upVotes, function(error, result) {
            if( error ) {
                console.log(error.reason);
            }
        });
    },

    'click .js-downvote': function(event) {
        event.preventDefault();

        var siteId = this._id,
            downVotes = this.votes.down + 1;

        Meteor.call('downVote', siteId, downVotes, function(error, result) {
            if( error ) {
                console.log(error.reason);
            }
        });
    }
});