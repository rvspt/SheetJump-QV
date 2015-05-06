// ------------------------------------------------------------------
// "SheetJump" QlikView Document Extension
// ~~
// "SheetJump" is a QlikView Document Extension, based on "AutoRefresh"
// extension created by Stefan Walther, that adds the funtionality of
// jumping between a sheet sequence defined in a document variable
// automatically every X seconds.
// ------------------------------------------------------------------
// Copyright
// ~~
// Renato Vieira - 24/07/2014
//
// LICENSE:
//      MIT License
//
// Configuration: follow the original documentation from "AutoRefresh"
//      https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
//      and add 3 document variables:
//          - vAutoRefresh_SheetsSequence (mandatory):
//                type the sheet sequence based on the sheet ID, separated
//                by a comma (,)
//                Example: SH01,SH02,SH06,SH08,SH03
//          - vAutoRefresh_NextSheet (optional)
//                if created, this variable will be updated with the 
//                indication of what sheet will be displayed upon next 
//                refresh
//          - vHideToolbar (mandatory):
//                if set with value 1, it will hide the toolbar
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// "AutoRefresh" QlikView Document Extension
// ~~
// "AutoRefresh" is a QlikView Document Extension which enables you to 
// add the ability to a QlikView application that it will be refreshed 
// automatically every X seconds.
// ------------------------------------------------------------------
// Copyright
// ~~
// Stefan Walther - 11/26/2013
//
// ~~
// DOCUMENTATION:
//      https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
// ~~
// SOURCE CODE:
//      https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
// ~~
// LICENSE:
//      MIT License
// ------------------------------------------------------------------

Qva.AddDocumentExtension('SheetJump', function () {

    // Definition of variable names to control the behavior of the AutoRefresh extension.
    var cRefreshInterval_VariableName = 'vAutoRefresh_EveryXSeconds';
    var cNextRefresh_VariableName = 'vAutoRefresh_NextRefresh';
    var cSheetsSequence_VariableName = 'vAutoRefresh_SheetsSequence';
    var cNextSheet_VariableName = 'vAutoRefresh_NextSheet';
    var cHideToolBar_VariableName = 'vHideToolbar';

    var _this = this;
    _this.ExtSettings = {};
    _this.ExtSettings.RefreshInterval = 10;  //Default value in seconds
    _this.ExtSettings.SheetsSequence = 'SH01'; //Default value for sheets sequence
    _this.ExtSettings.HiddeToolbar = 0;

    function Init() {

        // Before starting with the extension, fetch the settings for this
        // extension, set by the variables on document-level 
        // (vAutoRefresh_EveryXSeconds) is mandatory
        // (vAutoRefresh_SheetsSequence) is mandatory
        RetrieveRefreshInterval(function () {

            var refreshInterval = _this.ExtSettings.RefreshInterval;
            var sheetsSequenceLength = _this.ExtSettings.SheetsSequence.length;
            var sheetsSequenceIterator = 0;

            if(_this.ExtSettings.HiddeToolbar==1)
                $('#QvAjaxToolbar').css('display','none'); 

            var timerId = setInterval(function () {

                var nextRefreshDate = new Date();
                nextRefreshDate.setSeconds(nextRefreshDate.getSeconds() + _this.ExtSettings.RefreshInterval);
                Qv.GetCurrentDocument().binder.Set("Document.TabRow.Document\\"+_this.ExtSettings.SheetsSequence[sheetsSequenceIterator].trim(), "action", "", true);

                if(sheetsSequenceIterator<sheetsSequenceLength-1)
                    ++sheetsSequenceIterator;
                else
                    sheetsSequenceIterator=0;
                setNextRefreshDate(nextRefreshDate);
                setNextSheet(_this.ExtSettings.SheetsSequence[sheetsSequenceIterator]);

                console.log('AutoRefresh: ' +  _this.ExtSettings.SheetsSequence[sheetsSequenceIterator].trim()+' @ ' + getFormattedDate(nextRefreshDate));

            }, (refreshInterval * 1000));
            _this.ExtSettings.TimerId = timerId;

        });
    } 

    Init();

    function setNextRefreshDate(refreshDate) {
        _this.Document.SetVariable(cNextRefresh_VariableName, getFormattedDate(refreshDate).toString());
    }

    function setNextSheet(nextSheet) {
        _this.Document.SetVariable(cNextSheet_VariableName, nextSheet.toString());
    }

    // ------------------------------------------------------------------
    // Extension helper functions
    // ------------------------------------------------------------------

    function getFormattedDate(date) {

        var str = date.getFullYear() + "-" + (date.getMonth() + 1).pad(2) + "-" + date.getDate().pad(2) + " " + date.getHours().pad(2) + ":" + date.getMinutes().pad(2) + ":" + date.getSeconds().pad(2);
        return str;
    }

    Number.prototype.pad = function (len) {
        return (new Array(len + 1).join("0") + this).slice(-len);
    }

    function RetrieveRefreshInterval(fnCallBack) {

        var qvDoc = Qv.GetCurrentDocument();
        qvDoc.GetAllVariables(function (vars) {

            for (var i = 0; i < vars.length; i++) {
                var obj = vars[i];
                console.log(obj.name);

                if ((obj.isreserved == "false") && (obj.isconfig == "false")) {

                    if (obj.name.toLowerCase() == cRefreshInterval_VariableName.toLowerCase()) {
                        try {
                            _this.ExtSettings.RefreshInterval = parseInt(obj.value);
                        } catch (e) {
                            console.error('Value of cRefreshInterval_VariableName is not a valid int value. Error message: '+e);
                        }
                    }

                    if (obj.name.toLowerCase() == cSheetsSequence_VariableName.toLowerCase()) {
                        try {
                            _this.ExtSettings.SheetsSequence =obj.value.split(',');
                        } catch (e) {
                            console.error('Value of cSheetsSequence_VariableName is not a valid int value. Error message: '+e);
                        }
                    }

                    if (obj.name.toLowerCase() == cHideToolBar_VariableName.toLowerCase()) {
                        try {
                            _this.ExtSettings.HiddeToolbar = parseInt(obj.value);
                        } catch (e) {
                            console.error('Value of cHideToolBar_VariableName is not a valid int value. Error message: '+e);
                        }
                    }
                }
            }

            console.log('Main properties created');
            console.log('  _this.ExtSettings.RefreshInterval: '+_this.ExtSettings.RefreshInterval);
            console.log('  _this.ExtSettings.SheetsSequence: array of '+_this.ExtSettings.SheetsSequence.length);
                console.log('    '+_this.ExtSettings.SheetsSequence);
            console.log('  _this.ExtSettings.HiddeToolbar: '+_this.ExtSettings.HiddeToolbar);

            fnCallBack();
        });
    }
}, false);                 
