import axios from 'axios';
import process from 'node:process';
import fs from 'node:fs';

async function fetchUrl(url) {
  try {
    const res = await axios.get(url);
    const data = res.data
    return data
  } catch (error) {
    throw error
  }
}

async function main() {
  const sourcePath = process.argv[2]
  const urls = fs.readFileSync(sourcePath, { encoding: 'utf-8' }).trim().split('\n')
  urls.forEach(async (url) => {
    console.log({url})
    const hostname = new URL(url).hostname
    try {
      const data = await fetchUrl(url)
      fs.writeFileSync(hostname, data, { encoding: 'utf-8', flag: 'w' })
      console.log(`Wrote to ${hostname}`)
    } catch (err) {
      console.log(`Couldn't download ${url}`)
    }
  })
}

main()