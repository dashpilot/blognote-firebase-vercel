# BlogNote

Blognote is a micro-blogging platform than saves your data to S3 or Github straight from your front-end app using Vercel functions!

This project provides a unified api to communicate with any S3-compatible storage (e.g. Amazon S3, Digitalocean Spaces, Scaleway etc) or a Github repo. It currently uses Firebase Auth for authentication but can easily be adapted to your preferred auth system

# How To

1.  Clone this repo and deploy to Vercel
2.  Set the following environment variables in Vercel:

### For use with S3-compatible storage:

S3_ENDPOINT: the endpoint of your S3-compatible storage (e.g. eu-central-1.linodeobjects.com)\\
S3_BUCKET: your bucket\\
S3_KEY: your S3 key\\
S3_SECRET: your S3 secret

### For use with a Github repo

GH_OWNER: Github username\\
GH_REPO: Github repo\\
GH_TOKEN: Github token

3.  Set the Firebase config in public/js/init.js to match your Firebase account

# Api

### Saving Data

To save data from your front-end app, just call:

`call_api('github/set-data', path, type, content)`

`path`: path to the file you want to save, e.g. `data.json` or `myimage.jpg`\\
`type`: type of data, e.g. `json` or `img`\\
`content`: the data

### Fetching data

To fetch data, just call:

`call_api('github/get-data', path)`

`path`: path to the file you want to save, e.g. `data.json` or `myimage.jpg`\\
