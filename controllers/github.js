'use strict';

const github = require('octonode');


exports.closeIssue = function (id){
    
    var client = github.client(process.env.GITHUB_KEY);
    var ghissue = client.issue(process.env.ISSUES_REPO, id);

    ghissue.update({
        "state": "closed",
    }, function(err, data, headers) {
        if(err) {
            console.log(err);
            res.send(err);
            return
        }
        res.send(data)
    });
}
