# @ogrtk/kintone-simple-plugin-packer

## Overview

`@ogrtk/kintone-simple-plugin-packer` is a CLI tool that simplifies the process of packing Kintone plugins. Unlike the original `@kintone/plugin-packer`, this tool allows users to specify a `.ppk` file during the first execution, streamlining the plugin packaging process across multiple runs.

## Features

- **One Command Packaging**: Specify the `.ppk` file from the first execution.
- **Consistent Command Usage**: Use the same command format for subsequent executions without modification.
- **Zip Directory Support**: Easily package a plugin directory into a zip file.

## Installation

```sh
npm install -g @ogrtk/kintone-simple-plugin-packer
```

## Usage

### Command Syntax

```sh
kintone-api-plugin-uploader -i <plugin-directory> --ppk <ppk-file-path> -o <output-zip-path>
```

### Options

| Option     | Alias | Description                      | Required |
| ---------- | ----- | -------------------------------- | -------- |
| `--input`  | `-i`  | The path to the plugin directory | Yes      |
| `--ppk`    |       | The path to the `.ppk` file      | Yes      |
| `--output` | `-o`  | The path to the output zip file  | Yes      |

### Example

#### First Execution (No Existing `.ppk` File)

```sh
kintone-api-plugin-uploader -i ./my-plugin --ppk ./private.ppk -o ./plugin.zip
```

- The tool will generate a new `.ppk` file and output the packaged zip file.

#### Subsequent Executions (Using the Existing `.ppk` File)

```sh
kintone-api-plugin-uploader -i ./my-plugin --ppk ./private.ppk -o ./plugin.zip
```

- The tool will reuse the existing `.ppk` file and output the updated zip file.

## How It Differs from `@kintone/plugin-packer`

With `@kintone/plugin-packer`, the first execution does not allow specifying a `.ppk` file. Users need to execute the command twice:

1. First execution without specifying a `.ppk` file.
2. Second execution specifying the generated `.ppk` file.

This package eliminates the need for two separate steps by enabling `.ppk` file specification from the start. Additionally, it maintains the same command format for both initial and subsequent executions, making the workflow more efficient and consistent.

## How It Works

The tool packages the specified plugin directory into a zip file and manages the `.ppk` file as follows:

1. **First Execution**:
   - If the specified `.ppk` file does not exist, a new one will be created.
2. **Subsequent Executions**:
   - The tool will use the existing `.ppk` file to repackage the plugin.

## Error Handling

If the specified input directory or `.ppk` file is not found, the tool will throw an error with a descriptive message.

## Development

To build and test the project locally, run the following commands:

```sh
npm run build
npm run test
```

## License

MIT

