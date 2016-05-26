# Changes
Changes made to the app by @maurocarrero in the test process.

### Global
1. Install deployd requirement globally.

### DPD
1. Add a string field to the collection in order to save the dates, since when tried to add as an object ("new Date()"),
it did not let me, mongo does not have the collection so I moved forward to avoid losing time with this, further research
would be required to discover the mysteries of dpd.
2. Edit the collection adding values for the existent rows.

### Angular
1. Build: great delay due to the installation of Selenium, it seems no e2e tests are ran, is this necessary?
2. Serve: The troubleshooting step was required: max_user_watches.
