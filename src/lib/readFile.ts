import globby from "globby";
import fs from "fs"

const readFile = async (filePath: string): Promise<string[]> => {
    const paths = await globby(filePath);
    const fileContents = (await Promise.all(paths.map(path => {
        return fs.readFileSync(path, "utf8")
    }))).join();
    const includeRegex = /^include\s+(.+?)$/ig
    const allLines = await Promise.all(fileContents.split('\n').map(line => {
        if (line.match(includeRegex)) { return readFile(includeRegex.exec(line.trim())![1]) }
        return [line]
    })).then(result => result.flat())

    return allLines
}

export default readFile