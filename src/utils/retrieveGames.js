async function fetchFile(){
    const file = await fetch("https://gist.githubusercontent.com/DeadSix27/b8e377c9fed6d98bff22dcdf8807e207/raw/52d1f2d31be7168a0486a3a355e06a2d751bdc44/gameslist.json")
    const response = await file.text()
    const convert = JSON.parse(response)
    let newArr = {}
    convert.map((item) => newArr[`${item.name}`] = item.id)
    console.log(newArr)
    require('fs').writeFile('./my.json', JSON.stringify(newArr),
        (err) =>{ if (err) console.error('Crap happens') }
    );
}

fetchFile() 