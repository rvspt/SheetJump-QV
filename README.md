# SheetJump-QV
A QlikView Document Extension, based on "AutoRefresh" extension created by Stefan Walther, that adds the funtionality of jumping between a sheet sequence defined in a document variable automatically every X seconds. Objective of the extension is to allow to keep the Session alive with QlikView Server and change sheets autonomously without user interaction.

Configuration: follow the original documentation from "AutoRefresh"
https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
and add 3 document variables:
  * vAutoRefresh_SheetsSequence (mandatory): type the sheet sequence based on the sheet ID, separated by a comma (,)
    - Example: SH01,SH02,SH06,SH08,SH03
  * vAutoRefresh_NextSheet (optional): if created, this variable will be updated with the indication of what sheet will be displayed upon next refresh
  * vHideToolbar (mandatory): if set with value 1, it will hide the toolbar

Check the examples in the "Example Apps" folder:
  * Sheet Jump: Application that has 4 sheets and jumps following the sequence SH01,SH02,SH03,SH04 with an interval of 5 seconds. This application doesn't hide the AJAX toolbar.
  * Sheet Jump TV: Application that has 4 sheets and jumps following the sequence SH01,SH04,SH03,SH02 with an interval of 5 seconds. This application hides the AJAX toolbar. 


Based on "AutoRefresh" QlikView Document Extension

Copyright
~~
Stefan Walther - 11/26/2013
- Documentation:  https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
- Source code:  https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
