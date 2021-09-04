import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'

async function main(){
    process.env['TOKEN'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGNhNTM0M0FjRGVhYURlRTQ3QzkyRkI0MThBY2EwZUJmODc5MmE2YzEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTM4MzMyMDg0OSwibmFtZSI6ImdyYXBoIn0.WfsTiVJuz7QboYrGZ5pc1UyguuSPOKH_-cGbLLDXG6w"

    const client = new NFTStorage({ token: process.env.TOKEN})

    var address = '0xb4DC6768F24FE285B88547DBb180888835c2d2F6'

    var jsonList = []


    // flora
    var protocol = 'flora'
    for ( var i = 1; i <= 5; i++){

        var filename= protocol + '_' + String(i) + '.jpg'

        const metadata = await client.store({
            name:protocol + ' level ' + String(i),
            description:'genesis ' + protocol + '(creator:' + address + ')',
            image: new File( [ fs.readFileSync(filename)], filename, {type: 'image/jpg' })
    
        })
    
        console.log('upload ' + metadata.url)

        var jsonFile = protocol + '_' + String(i) + ".json"
        var string = JSON.stringify(metadata.data)
        var parse = JSON.parse(string)
        var image = parse['image']

        parse['image'] = 'https://ipfs.io/ipfs/' + image.slice(7)
        console.log(parse)

        jsonList.push(new File([JSON.stringify(parse)], jsonFile))
    }

    // flora

    var protocol = 'fauna'
    for ( var i = 1; i <= 5; i++){

        var filename= protocol + '_' + String(i) + '.jpg'

        const metadata = await client.store({
            name:protocol + ' level ' + String(i),
            description:'genesis ' + protocol + '(creator:' + address + ')',
            image: new File( [ fs.readFileSync(filename)], filename, {type: 'image/jpg' })
    
        })
    
        console.log('upload ' + metadata.url)

        var jsonFile = protocol + '_' + String(i) + ".json"
        var string = JSON.stringify(metadata.data)
        var parse = JSON.parse(string)
        var image = parse['image']

        parse['image'] = 'https://ipfs.io/ipfs/' + image.slice(7)
        console.log(parse)

        jsonList.push(new File([JSON.stringify(parse)], jsonFile))
    }

    // series
    var protocol = 'series'
    var filename= protocol + '.jpg'

    const metadata = await client.store({
        name:protocol,
        description:'genesis ' + protocol + '(creator:' + address + ')',
        image: new File( [ fs.readFileSync(filename)], filename, {type: 'image/jpg' })

    })

    console.log('upload ' + metadata.url)

    var jsonFile = protocol +  ".json"
    var string = JSON.stringify(metadata.data)
    var parse = JSON.parse(string)
    var image = parse['image']

    parse['image'] = 'https://ipfs.io/ipfs/' + image.slice(7)
    console.log(parse)

    jsonList.push(new File([JSON.stringify(parse)], jsonFile))

    const cid = await client.storeDirectory(jsonList)
    console.log('ipfs://' + cid)
}

main()
