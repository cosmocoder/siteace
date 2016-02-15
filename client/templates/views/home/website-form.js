Template.website_form.events({
    'submit .js-save-website-form': function(event, template) {
        event.preventDefault();

        var form = event.target,
            $alerts = template.$('span.alert'),
            data = {
                url: form.url.value,
                title: form.title.value,
                description: form.description.value
            };

        $alerts.filter('#insert-success').show();

        Meteor.call('addNewSite', data, function(error, result) {
            if( error ) {
                console.log(error.reason);
                $alerts.hide().filter('#insert-error').text(error.reason).show();
            }
            else {
                $alerts.hide().filter('#insert-success').show();
            }
        });
    }
});