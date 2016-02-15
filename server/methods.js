var cheerio = Meteor.npmRequire('cheerio');

Meteor.methods({
    addNewSite: function(siteData) {
        check(siteData.title, String);
        check(siteData.description, String);
        check(siteData.url, String);

        var currentUser = Meteor.userId(),
            data = {
                url: siteData.url,
                title: siteData.title,
                description: siteData.description,
                votes: {
                    up: 0,
                    down: 0
                },
                createdOn: new Date()
            };

        if( !currentUser ) {
            throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        if( !siteData.title || !siteData.description ) {
            try {
                var siteContent = HTTP.call('GET', siteData.url).content,
                    $ = cheerio.load(siteContent);

                if( !siteData.title ) {
                    data.title = $('title').text();
                }

                if( !siteData.description ) {
                    var description = $('meta[name=description]').attr('content');

                    if( description ) {
                        data.description = description;
                    }
                }
            }
            catch(e) {

            }
        }

        return Websites.insert(data);
    },

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