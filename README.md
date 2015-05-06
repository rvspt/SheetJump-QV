# SheetJump-QV
A QlikView Document Extension, based on "AutoRefresh" extension created by Stefan Walther, that adds the funtionality of jumping between a sheet sequence defined in a document variable automatically every X seconds

Configuration: follow the original documentation from "AutoRefresh"
https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
and add 3 document variables:
  * vAutoRefresh_SheetsSequence (mandatory): type the sheet sequence based on the sheet ID, separated by a comma (,)
    - Example: SH01,SH02,SH06,SH08,SH03
  * vAutoRefresh_NextSheet (optional): if created, this variable will be updated with the indication of what sheet will be displayed upon next refresh
  * vHideToolbar (mandatory): if set with value 1, it will hide the toolbar


Based on "AutoRefresh" QlikView Document Extension

Copyright
~~
Stefan Walther - 11/26/2013
DOCUMENTATION:
  https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
SOURCE CODE:
  https://github.com/stefanwalther/QlikView-Extension-AutoRefresh/
