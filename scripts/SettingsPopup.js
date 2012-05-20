var SettingsPopup = {
    init: function() {
        var settings = new Settings();

        // FLATTR

        if (has_flattr_access_token) {
            $('<a class="title" target="_blank"></a>').attr('href', 'https://flattr.com/profile/' + flattr_user_name).text(flattr_user_name).appendTo('#settings .connections .flattr');
            $('<a class="button disconnect" href="/flattrdisconnect"></a>').text(TranslationSystem.get('Disconnect')).appendTo('#settings .connections .flattr');
        } else {
            $('<span class="title">Flattr</span>').appendTo('#settings .connections .flattr');
            $('<a class="button connect" href="/flattrconnect"></a>').text(TranslationSystem.get('Connect')).appendTo('#settings .connections .flattr');
        }

        // QUALITY

        $('#qualityLowRadio')
            .attr('checked', (settings.quality === 'small'))
            .change(function() { 
                var settings = new Settings();
                settings.quality = 'small'; 
                settings.save(); 
            });

        $('#qualityHighRadio')
            .attr('checked', (settings.quality === 'hd720'))
            .change(function() { 
                var settings = new Settings();
                settings.quality = 'hd720'; 
                settings.save(); 
            });
            
        // NOTIFICATIONS

        if (!window.webkitNotifications) {
            $('#settings .notifications').hide();
        }
        $('#notificationRange').change(function() {
            $('#notificationRangeText').text(this.value);
            var settings = new Settings();
            settings.announceTimeout = parseInt(this.value, 10) * 1000;
            settings.save(); 
        });

        // LANGUAGE

        $('#settings .language select').change(function() {
            var code = $(this).val();
            var settings = new Settings();
            settings.language = code;
            settings.save();
            TranslationSystem.changeLanguage(code);
        });
    }
};
