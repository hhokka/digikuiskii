# Digikuiskii

Mobiiliapplikaatio Digikuiskii-projektia varten.

## Applikaatio sivuittain

##### Digikuiskii (aloitussivu)

![etusivu](C:\ionicproject\conFusion\readme_files\etusivu.png)



##### Päävalikko

![kaikki-sivut](C:\ionicproject\conFusion\readme_files\kaikki-sivut.png)

##### Map (sijainti kartalla)

![location](C:\ionicproject\conFusion\readme_files\location.png)



##### Location (devaamiseen)

![gps](C:\ionicproject\conFusion\readme_files\gps.png)

##### Firebase (tietokannan manipulointi devaamisessa)

![firebase-manipulation](C:\ionicproject\conFusion\readme_files\firebase-manipulation.png)

##### Login (rekisteröinti, kirjautuminen, salasanan resetointi)

![login](C:\ionicproject\conFusion\readme_files\login.png)



##### User Details (käyttäjän tiedot)

![user-details](C:\ionicproject\conFusion\readme_files\user-details.png)

##### Työpaikat (kysyy ensin järjestysperustetta)

![tyopaikat-alert](C:\ionicproject\conFusion\readme_files\tyopaikat-alert.png)

##### Työpaikat (järjestettynä alert-valinnan mukaan)

![tyopaikat-sorted](C:\ionicproject\conFusion\readme_files\tyopaikat-sorted.png)





## Firebase

Firebase on Googlen Back End -pilvipalvelu. Digikuiskiissa on käytetty kahta sen ominaisuutta: autentikointia ja tietokantaa.

Alla näkymä autentikoinnista. Luotuna on yksi käyttäjä, hans.hokka@gmail.com.  'Login'-sivu on suoraan tähän yhteydessä.

![firebase-auth](C:\ionicproject\conFusion\readme_files\firebase-auth.png)



Seuraavana näkymä tietokannasta. Tietokannan nimi on 'smartlab-digikuiskii'. Sen alla '7V...' -sarja on käyttäjän id. Tässä on luotu yksi käyttäjä. 'address' sisältää käyttäjän tämänhetkisen sijainnin tekstinä. 'userDetailedInfo' sisältää käyttöliittymän sivun 'User Details' tiedot, tässä on esimerkiksi valittu kotikunnaksi 'Kauniainen'.

Tietokanta on NoSql-tyyppiä. *Käytännössä sitä voi pitää JSON-objektina.*

![firebase-database](C:\ionicproject\conFusion\readme_files\firebase-database.png)



Osoite Firebasen konsoliin: https://console.firebase.google.com/project/smartlab-digikuiskii/overview



Osoitteeseen smartlabvantaa@gmail.com on lähetetty kutsu, jolla pääsee digikuiskiin owneriksi Firebaseen.



## Devausympäristön rakentaminen

A) Asenna **Java JDK**, **Apache Ant** ja **Android SDK**.

*NOTE: Whenever you make changes to the PATH, or any other environment variable, you'll need to restart or open a new tab in your shell program for the PATH change to take effect.*

**Java JDK**

Install the most recent [Java 8 JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (NOT just the JRE), JDK 9 is NOT currently (2017.12) supported by Cordova.

Next, create an environment variable for `JAVA_HOME` pointing to the root folder where the Java JDK was installed. So, if you installed the JDK into `C:\Program Files\Java\jdk7`, set `JAVA_HOME` to be this path. After that, add the JDK's `bin` directory to the PATH variable as well. Following the previous assumption, this should be either `%JAVA_HOME%\bin` or the full path `C:\Program Files\Java\jdk7\bin`

**Apache Ant**

To install Ant, download a zip from [here](http://ant.apache.org/bindownload.cgi), extract it, move the first folder in the zip to a safe place, and update your PATH to include the `bin` folder in that folder. For example, if you moved the Ant folder to `c:/`, you'd want to add this to your PATH: `C:\apache-ant-1.9.2\bin`.

**Android SDK**

Installing the [Android SDK](http://developer.android.com/sdk/index.html) is also necessary. The Android SDK provides you the API libraries and developer tools necessary to build, test, and debug apps for Android.

Cordova requires the ANDROID_HOME environment variable to be set. This should point to the `[ANDROID_SDK_DIR]\android-sdk` directory (for example `c:\android\android-sdk`).

Next, update your PATH to include the `tools/` and `platform-tools/` folder in that folder. So, using ANDROID_HOME, you would add both `%ANDROID_HOME%\tools` and `%ANDROID_HOME%\platform-tools`



B) Asenna loput tarvittavat:
1. [Git for Windows](http://git-scm.com/download/win)

  2. [Node.js](http://nodejs.org/)

  3. [Apache Cordova](http://cordova.apache.org/)
```
  npm install -g cordova
```
    4. [Visual Studio Code](https://code.visualstudio.com/)

    5. Ionic

 ```
npm install -g ionic
 ```


   ```
ionic cordova platform add android
   ```
   D) Testaa asennus
   ```
ionic cordova build android
ionic cordova emulate android
   ```

E) Kloonaa repo https://github.com/City-of-Vantaa-SmartLab/digikuiskii.git

F) Käynnistä IonicLab:

```
ionic serve -l
```

## Stack

IOnic

Cordova

Sass

TypeScript

Firebase



## Tekijät

* **Hans Hokka** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the SmartLab Pseudoreal License - see the [LICENSE.md](LICENSE.md) file for details

## Muuta

