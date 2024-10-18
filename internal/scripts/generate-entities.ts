import { parseArgs } from "@std/cli"

const args = parseArgs(Deno.args)._

const RED = "\x1b[31m"
const OUT_DIR = import.meta.resolve("../../app/entities")
const DEFAULT_IMPORTS =
    `import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"`

function usage() {
    console.error(
        RED + `Usage: deno run gen:entity <Entity Name> ...[column:type]`,
    )
}

const ENTITY_COLUMN_TYPE: Record<string, string> = {
    text: "string",
    varchar: "string",
    date: "Date",
    datetime: "Date",
    decimal: "number",
    real: "number",
}

class ColumnDef {
    constructor(
        public name: string,
        public type: string,
    ) {}

    toColumnDecorator() {
        return `\t@Column()\n\t${this.name}: ${this.type}\n`
    }
}

const TEMPLATE = (args: { entityName: string; columns: ColumnDef[] }) =>
    `
${DEFAULT_IMPORTS}

@Entity()
export class ${args.entityName} extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

${
        args.columns
            .map((col) => col.toColumnDecorator())
            .join("\n")
            .trimEnd()
    }
}
`.trim()

if (import.meta.main) {
    let entityName = args.shift()

    if (typeof entityName !== "string") {
        usage()
        Deno.exit(1)
    }

    entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1)

    const columns: ColumnDef[] = args.map((col) => {
        if (typeof col !== "string") {
            console.error(RED + "Invalid column definition")
            Deno.exit(1)
        }
        const [columnName, columnType] = col.split(":")
        if (!columnName || !columnType) {
            console.error(RED + "Invalid column definition")
            Deno.exit(1)
        }
        const type = ENTITY_COLUMN_TYPE[columnType]
        if (!type) {
            console.error(RED + `Invalid column type: ${columnType}`)
            Deno.exit(1)
        }

        return new ColumnDef(columnName, type)
    })

    const tmpl = TEMPLATE({ entityName, columns })
    const filePath = new URL(`${OUT_DIR}/${entityName}.ts`)
    await Deno.writeTextFile(filePath, tmpl)

    const barrelFile = new URL(`${OUT_DIR}/*.ts`)
    const exportEntityStmt = `\nexport * from "./${entityName}.ts"`
    await Deno.writeTextFile(barrelFile, exportEntityStmt, { append: true })

    console.log(`Entity generated at ${filePath.pathname}`)
}
