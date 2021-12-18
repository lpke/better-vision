# BetterVision

BetterVision is a Chrome extension that aims to make the IOVision experience a little more user friendly.

## Objectives

### Input features

* Jira-like time input
  * `d`, `h`, `m`, `s` detection / conversion
	* Number without unit = days
* Inline arithmetic support
	* Example - New value: `0.13 + 0.45`
  * Example - Adjust existing value: `+ 1h`
* Auto-calculation
	* Example - Input remaining time for day: `=`
	* Also support arithmetic: `= - 1h`

## Current State 

* All existing code was written in vanilla javascript and is messy
* Initial to-dos:
  * Code needs to be cleaned up
  * Use React
  * Create proper state management
  * Work out a less-hacky way of intercepting inputs
