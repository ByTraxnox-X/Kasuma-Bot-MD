import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import {
        ffmpeg
} from './converter.cjs'
import {
        spawn
} = require 'child_process'
import uploadFile from './uploadFile.cjs'
import uploadImage from './uploadImage.cjs'

import tmp = path.join(__dirname, '../tmp')

/**
 * Add WhatsApp JSON Exif Metadata
 * Taken from https://github.com/pedroslopez/whatsapp-web.js/pull/527/files
 * @param {Buffer} webpSticker 
 * @param {String} packname 
 * @param {String} author 
 * @param {String} categories 
 * @param {Object} extra 
 * @returns 
 */
async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
        const {
                Image
        } = require('node-webpmux') // Optional Feature
        const img = new Image();
        const stickerPackId = crypto.randomBytes(32).toString('hex');
        const json = {
                'sticker-pack-id': stickerPackId,
                'sticker-pack-name': packname,
                'sticker-pack-publisher': author,
                'emojis': categories,
                ...extra
        };
        const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
        const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
        const exif = Buffer.concat([exifAttr, jsonBuffer]);
        exif.writeUIntLE(jsonBuffer.length, 14, 4);
        await img.load(webpSticker)
        img.exif = exif
        return await img.save(null)
}
/**
 * Image to Sticker
 * @param {Buffer} img Image/Video Buffer
 * @param {String} url Image/Video URL
 */
async function stiker(img, url) {
        const {
                fileTypeFromBuffer
        } = await import('file-type')
        if (url) {
                img = await getbuffer(url)
        }
        const {
                ext
        } = await fileTypeFromBuffer(img)
        if (ext == 'mp4') {
                return await ffmpeg(img, [
                        `-vcodec`, `libwebp`,
                        `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`
                ], 'mp4', 'webp')
        } else {
                return await ffmpeg(img, [
                        '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1'
                ], 'jpeg', 'webp')
        }
}

/**
 * Image to Sticker
 */

export = {
        async sticker(img, ...args) {
                const s
                if (Buffer.isBuffer(img)) s = await stiker(img)
                else s = await stiker(null, img)
                return await addExif(s, ...args)
        },
        addExif
}