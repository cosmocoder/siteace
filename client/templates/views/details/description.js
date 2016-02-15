var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Template.site_description.helpers({

    // get the formatted date for when the site was added
    date_added: function() {
        var date = new Date(this.createdOn);
        return monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }
});