This project was created by Taras Ignashchenko for Genesis.

## Table of Contents

* `Running application`
* `Tech stack`
* `Application flow`
* `Signing in`
* `Feed`
 
## Tech stack

This application was built using React Native and Redux.

## Running application

You should install local dependencies through 'yarn install'. Application build should be done through Xcode and Android Studio. The current version of this application was successfully built and ran on an iPhone 6 (11.2) and on a Nexus 5X (6.0 Marshmallow and 4.1 Jelly Bean).

## Application flow

The following is an outline of the application flow and its implementations the user should be made aware of:

### `Signing in`


The user is presented with a simple sign in page that allows access to the application's core functionality only if the user has a GitHub account. 
GitHub's basic authentication method that works with two-factor authentication is used (for more information, please see: https://developer.github.com/v3/auth/#basic-authentication).

### `Repo feed`

If the user is authorized by the GitHub API, he/she is navigated to the repo feed page. React Navigation was utilized in this project.
AsyncStorage is used to automatically load previously searched repos *(please refer to the **Bugs** section for issues with detecting network status and AsyncStorage functionality on Android)*.

If the user is logged in, he/she may refresh and will remain on this page by storing a necessary value in AsyncStorage. Only by clicking the sign out button will the user be re-directed back to the sign in page (please see **Bugs** section for issue on flickering sign in page).

The user has the option of searching for a GitHub repo and is presented with the first 15 results. With the help of infinite scroll functionality, 15 repos are fetched each time the user nears the end of the repo list. The input fields and repo name strings are limited to 30 characters.

If no repos are present, a placeholder **O** is set to indicate the absence of repos in AsyncStorage or in the Redux state (please see **Bugs** regarding its absence in Android). 

The amount of repos currently loaded is displayed and repos may be sorted by name (default sort when search is conducted), names, and forks through the help of the Picker component. 

Each repo may be clicked upon and opened in a separate Web View component and its contents are displayed in more detail.

## Bugs

### `Detecting network status`

Network status was obtained by using the NetInfo component. Regardless of whether any network connection was present on the machine, an `unknown` status was returned and thus stored repos are always loaded.

### `Async storage functionality with Android`

The Android build does not load any repos from AsyncStorage. This problem needs to be investigated further.

### `Flickering sign in page when refreshing repo feed page`

The sign in page briefly appears before re-directing to the repo feed page if the user is logged in. React Navigation functionality needs to be more deeply scrutinized to understand the reason for htis problem.

### `Absence of placeholder if no repos are present with Android`

Placeholder is not displayed on Android. Even by removing styles, the simple View-Text component combination does not render at all. Most likely Android-related formatting issues, however this did not happen on the numerous View-Text component combinations present in this application.