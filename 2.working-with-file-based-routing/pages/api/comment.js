import fs from 'fs';
import path from 'path';

const handler = (req, res) => {

    if(req.method === 'POST')
    {
        const name = req.body.name;
        const email = req.body.email;
        const text = req.body.text;
        const eventId = req.body.eventId;

        const commentObj = {
            id : new Date().toISOString(),
            name  : name,
            text : text,
            eventId : eventId
        };

        const filepath = path.join(process.cwd(),'data','comments.json');
        const fileData = JSON.parse(fs.readFileSync(filepath));
        fileData.push(commentObj);
        fs.writeFileSync(filepath,JSON.stringify(fileData));

        res.status(200).json({
            status : 200,
            message : 'Comments added!',
            comment : commentObj
        })

    }

    res.status(200).json({
        'message' : 'Working!'
    })
}

export default handler;