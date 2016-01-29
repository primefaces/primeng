var DemoApp = {

    changeTheme: function(event, element) {
        var theme = $(element).data("theme"),
        themeLink = $('link[href$="theme.css"]'),
        newThemeURL =  'showcase/resources/primeui/themes/' + theme + '/theme.css';

        themeLink.attr('href', newThemeURL);
        event.preventDefault();
    }
    
};