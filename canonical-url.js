BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)

try {
    return com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, '<t4 type="content" name="Name" output="fulltext" modifiers="striptags,htmlentities" />').trim();
} catch (e) {
    return (e);
}


// var articleTitle = com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, "<t4 type='content' name='Article Title' output='normal' display_field='value' />");