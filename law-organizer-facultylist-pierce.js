/***
 *      @author Pierce Harriz
 *      @file organizer.faculty.js
 *      @see Seattle University School of Law Faculty Profile Type
 *      law/organizer/facultyList/
 *
 *      This content layout will be the organizer layout and will link to the
 *      full text layout to reveal the full article.
 *
 *      Document will write once when the page loads
 *
 *      @version 4.0
 */



try {

    function getValueFromTag(tag) {
        try {
            return {
                isError: false,
                content: com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
            }
        } catch (error) {
            return {
                isError: true,
                message: error.message
            }
        }
    }
    ​
    // Create dictionary holding the values we need.
    const dict = {
        contentName: getValueFromTag("<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />"),
        firstName: getValueFromTag("<t4 type='content' name='First Name' output='normal' modifiers='striptags,htmlentities' />"),
        lastName: getValueFromTag("<t4 type='content' name='Last Name' output='normal' modifiers='striptags,htmlentities' />"),
        facultyStatus: getValueFromTag("<t4 type='content' name='Faculty Status' output='normal' display_field='value' />"),
        primaryTitle: getValueFromTag("<t4 type='content' name='Primary Title' output='normal' modifiers='striptags,htmlentities />"),
        secondaryTitle: getValueFromTag("<t4 type='content' name='Secondary Title' output='normal' modifiers='striptags,htmlentities />"),
        primaryImage: getValueFromTag("<t4 type='content' name='Profile Pic' output='normal' formatter='path/*' />"),
        emailAddress: getValueFromTag("<t4 type='content' name='Email' output='normal' modifiers='striptags,htmlentities,encode_emails' />"),
        roomNumber: getValueFromTag("<t4 type='content' name='Room' output='normal' modifiers='striptags,htmlentities />"),
        cv: getValueFromTag("<t4 type='content' name='CV' output='normal' formatter='path/*' />"),
        cvLinkStatus: getValueFromTag("<t4 type='content' name='Show link to CV' output='normal' display_field='value' />"),
        education: getValueFromTag("<t4 type='content' name='Education' output='normal' modifiers='medialibrary,nav_sections' />"),
        expertise: getValueFromTag("<t4 type='content' name='Areas of Expertise' output='normal' modifiers='medialibrary,nav_sections' />"),
        affiliations: getValueFromTag("<t4 type='content' name='Affiliations' output='normal' modifiers='medialibrary,nav_sections' />"),
        courses: getValueFromTag("<t4 type='content' name='Courses' output='normal' modifiers='medialibrary,nav_sections' />"),
        biography: getValueFromTag("<t4 type='content' name='Biography' output='normal' modifiers='medialibrary,nav_sections' />"),
        publications: getValueFromTag("<t4 type='content' name='Publications' output='normal' modifiers='medialibrary,nav_sections' />"),
        activity: getValueFromTag("<t4 type='content' name='Activity' output='normal' modifiers='medialibrary,nav_sections' />"),
        fullTextLink: getValueFromTag("<t4 type='content' name='Name' output='fulltext' modifiers='striptags,htmlentities' />"),
        anchorTag: getValueFromTag("<t4 type='meta' meta='html_anchor' />"),
        contentID: getValueFromTag("<t4 type='meta' meta='content_id' />")
    }
    ​
    // Get all the errors returned from getValueFromTag and put them in errorString.
    let errorString = ''
    const keys = Object.keys(dict)
    for (let i = 0; i < keys.length; i++) {
        if (dict[keys[i]].isError) {
            errorString += `${keys[i]} - ${dict[keys[i]].message}\n`
        }
    }
    ​
    // If errors exist, display them. If not, continue.
    if (errorString) {
        document.write('Faild to get needed profile information from the following:\n')
        document.write(`<pre>${errorString}</pre>`)
    } else {
        /***
         *  Declare/Assign local variables with base formatting
         *
         * */
        let hiddenFields = ''
        const openHiddenFields = '<div class="hiddenSearchText visually-hidden">'
        const closeHiddenFields = '</div>'
        const primaryImageString = '<img src="' + dict.primaryImage.content + '" class="card-img rounded-circle" alt="' + dict.firstName.content + ' ' + dict.lastName.content + ', ' + dict.primaryTitle.content + '">'
        let cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start">' + dict.firstName.content + ' ' + dict.lastName.content + '</h3>'
        const primaryTitleString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + dict.primaryTitle.content + '</p>'
        const emailAddressString = '<p class="card-text d-flex justify-content-center justify-content-md-start text-center text-md-start"><a href="mailto:' + dict.emailAddress.content + '?subject=From your Faculty Profile" title="Email ' + dict.firstName.content + ' ' + dict.lastName.content + '">Contact ' + dict.firstName.content + '</a></p>'
        // const closeCardTitle = '</h3>';
        const openCardBody = '<div class="card-body">'
        const closeCardBody = '</div>'
        const openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">'
        const closeBodyWrapper = '</div>'
        const openImageWrapper = '<div class="col-md-4">'
        const closeImageWrapper = '</div>'
        const openRow = '<div class="row g-0">'
        const closeRow = '</div>'
        const anchorWrap = '<div class="visually-hidden">' + dict.anchorTag.content + '</div>'
        const beginningHTML = '<div class="lawFacultyWrapper contentItem card w-100 border-0" aria-label="' + dict.firstName.content + ' ' + dict.lastName.content + '" id="id' + dict.contentID.content + '" data-position-default="Main" data-position-selected="Main">'
        const endingHTML = '</div>'
        const horizontalRule = '<hr class="lawProfileBorderRule" />'
    ​
        /***
         *  determine if the article contains full text content
         *
         * */
        if (dict.biography.content) {
            cardTitle = '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start"><a href="' + dict.fullTextLink.content + '" title="' + dict.firstName.content + ' ' + dict.lastName.content + ', ' + dict.primaryTitle.content + '">' + dict.firstName.content + ' ' + dict.lastName.content + '</a></h3>'
        }
    ​
        /***
         *  write hidden search fields
         *
         * */
        if (dict.secondaryTitle.content) {
            hiddenFields += '<span class="visually-hidden secondaryTitle">' + dict.secondaryTitle.content + '</span>'
        }
        if (dict.education.content) {
            hiddenFields += '<span class="visually-hidden education">' + dict.education.content + '</span>'
        }
        if (dict.expertise.content) {
            hiddenFields += '<span class="visually-hidden expertise">' + dict.expertise.content + '</span>'
        }
        if (dict.affiliations.content) {
            hiddenFields += '<span class="visually-hidden affiliations">' + dict.affiliations.content + '</span>'
        }
        if (dict.courses.content) {
            hiddenFields += '<span class="visually-hidden courses">' + dict.courses.content + '</span>'
        }
        if (dict.biography.content) {
            hiddenFields += '<span class="visually-hidden biography">' + dict.biography.content + '</span>'
        }
        if (dict.publications.content) {
            hiddenFields += '<span class="visually-hidden publications">' + dict.publications.content + '</span>'
        }
        if (dict.activity.content) {
            hiddenFields += '<span class="visually-hidden activity">' + dict.activity.content + '</span>'
        }
        if (dict.facultyStatus.content) {
            hiddenFields += '<span class="visually-hidden facultyStatus">' + dict.facultyStatus.content + '</span>'
        }
    ​
        /***
         *  Write the document once
         *
         * */
        document.write(beginningHTML)
        document.write(anchorWrap)
        document.write(openRow)
        document.write(openImageWrapper)
        document.write(primaryImageString)
        document.write(closeImageWrapper)
        document.write(openBodyWrapper)
        document.write(openCardBody)
        document.write(cardTitle)
        document.write(primaryTitleString)
        document.write(emailAddressString)
        document.write(closeCardBody)
        document.write(closeBodyWrapper)
        document.write(closeRow)
        document.write(openHiddenFields)
        document.write(hiddenFields)
        document.write(closeHiddenFields)
        document.write(horizontalRule)
        document.write(endingHTML)
    }
    

} catch (err) {
    document.write(err.message);
}