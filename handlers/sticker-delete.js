module.exports = async (ctx) => {
  const stickerLinkPrefix = 'https://t.me/addstickers/'

  let result

  if (ctx.message.reply_to_message) {
    const replyMessage = ctx.message.reply_to_message

    if (replyMessage.sticker) {
      const deleteStickerFromSet = await ctx.telegram.deleteStickerFromSet(replyMessage.sticker.file_id).catch((error) => {
        result = ctx.i18n.t('sticker.delete.error.telegram', {
          error
        })
      })

      if (deleteStickerFromSet) {
        result = ctx.i18n.t('sticker.delete.suc', {
          link: `${stickerLinkPrefix}${ctx.group.info.stickerSet.name}`
        })
      }
    }
  }

  if (result) {
    ctx.replyWithHTML(result, {
      reply_to_message_id: ctx.message.message_id
    })
  }
}
