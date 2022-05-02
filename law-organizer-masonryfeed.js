/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Faculty Directory Application
 *    @file law-organizer-masonryfeed.js
 *          Law - Faculty Profile
 *          ID: 5143
 *          law/organizer/masonryfeed/
 *
 *      Document will write once when the page loads
 *      Custom feed for the searchable, sortable faculty app directory
 *
 *      @version 5.12.1
 */








/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field and trim strings
 */
 function getContentValues(tag) {

    try {

        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();

        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };

    } catch (error) {

        return {
            isError: true,
            message: error.message
        };
    }
}




/***
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
}




/***
 *      Main
 */
try {


    /***
     *      Dictionary of content
     * */
    let directoryDict = {

        contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
        firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
        facultyStatus: getContentValues('<t4 type="content" name="Faculty Status" output="normal" display_field="value" />'),
        primaryTitle: getContentValues('<t4 type="content" name="Primary Title" output="normal" modifiers="striptags,htmlentities" />'),
        emailAddress: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        primaryImage: getContentValues('<t4 type="content" name="Profile Pic" output="normal" formatter="path/*" />'),
        biography: getContentValues('<t4 type="content" name="Biography" output="normal" modifiers="medialibrary,nav_sections" />'),
        fullTextLink: getContentValues('<t4 type="content" name="Name" output="fulltext" use-element="true" filename-element="Name" modifiers="striptags,htmlentities" />'),
        contentId: getContentValues('<t4 type="meta" meta="content_id" />')

    };




    /***
     *  Declare/Assign local variables with base formatting
     * 
     * */
    let openHiddenFields = '<div class="hiddenSearchText visually-hidden">';
    let closeHiddenFields = '</div>';
    let openCardBody = '<div class="card-body">';
    let closeCardBody = '</div>';
    let openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">';
    let closeBodyWrapper = '</div>';
    let openImageWrapper = '<div class="col-md-4 d-flex align-items-center">';
    let closeImageWrapper = '</div>';
    let openFig = '<figure class="figure visually-hidden">';
    let closeFig = '</figure>'
    let openRow = '<div class="row g-0">';
    let closeRow = '</div>';
    let openCard = '<div class="card h-100 w-100 border-0">';
    let closeCard = '</div>';
    let primaryImageString = '<span class="primaryImageString hidden visually-hidden">No Image Provided</span>';
    let emailAddressString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start"><a class="emailAddress card-link" href="mailto:' + directoryDict.emailAddress.content + '?subject=From your Faculty Profile" title="Email ' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + '">Contact ' + directoryDict.firstName.content + '</a></p>';
    let primaryTitleString = '<p class="card-text mb-0 d-flex justify-content-center justify-content-md-start text-center text-md-start">' + directoryDict.primaryTitle.content + '</p>';
    let endingHTML = '</article>';




    /***
     *  parse title link for full name and primary title
     * 
     * */
    let beginningHTML = (directoryDict.firstName.content && directoryDict.lastName.content) ?
        '<article class="lawFacultyWrapper col flex-fill w-50" id="directoryBio' + directoryDict.contentId.content + '" aria-label="' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + '">' :
        '<article class="lawFacultyWrapper col flex-fill w-50" id="directoryBio' + directoryDict.contentId.content + '" aria-label="' + directoryDict.contentName.content + '">';




    /***
     *  parse title link for full name and primary title
     * 
     * */
    let cardTitle = (directoryDict.fullName.content && directoryDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + directoryDict.fullTextLink.content + '" title="' + directoryDict.fullName.content + ', ' + directoryDict.primaryTitle.content + '">' + directoryDict.fullName.content + '</a></h3>' :
        (directoryDict.fullName.content && !directoryDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + directoryDict.fullTextLink.content + '" title="' + directoryDict.fullName.content + '">' + directoryDict.fullName.content + '</a></h3>' :
        (directoryDict.firstName.content && directoryDict.lastName.content && directoryDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + directoryDict.fullTextLink.content + '" title="' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + ', ' + directoryDict.primaryTitle.content + '">' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + '</a></h3>' :
        (directoryDict.firstName.content && directoryDict.lastName.content && !directoryDict.primaryTitle.content) ?
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + directoryDict.fullTextLink.content + '" title="' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + '">' + directoryDict.firstName.content + ' ' + directoryDict.lastName.content + '</a></h3>' :
        '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + directoryDict.fullTextLink.content + '" title="' + directoryDict.contentName.content + '">' + directoryDict.contentName.content + '</a></h3>';




    /***
     *  parse hidden search fields
     * 
     * */
    let facultyStatusString = (directoryDict.facultyStatus.content) ?
        '<span class="visually-hidden facultyStatus">' + directoryDict.facultyStatus.content + '</span>' :
        '<span class="visually-hidden facultyStatus">No Status Entered</span>';




    /***
     *  Parse for image
     * 
     * */
    if (directoryDict.primaryImage.content) {

        let imageID = content.get('Profile Pic').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let imageDefaultAlt = directoryDict.fullName.content || directoryDict.contentName.content;

        primaryImageString = (info.check()) ?
            '<img src="' + directoryDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<img src="' + directoryDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" alt="' + imageDefaultAlt + '" loading="auto" />';

        openFig = '<figure class="figure">';
    }




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,
            openCard,
            openRow,
            openImageWrapper,
            openFig,
            primaryImageString,
            closeFig,
            closeImageWrapper,
            openBodyWrapper,
            openCardBody,
            cardTitle,
            primaryTitleString,
            emailAddressString,
            openHiddenFields,
            facultyStatusString,
            closeHiddenFields,
            closeCardBody,
            closeBodyWrapper,
            closeRow,
            closeCard,
            endingHTML
        ]
    );




} catch (err) {
    document.write(err.message);
}