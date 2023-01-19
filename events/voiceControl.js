const { Events } = require("discord.js"),
  ChannelMap = new Map(),
  CreateChannelID = "1064270683858817075",
  CreateCategoryID = "1063961121150742630",
  CreateChannelConrolID = "1063961162477211748";

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldVoice, newVoice) {
    if (oldVoice.member.user.bot) return;
    if (newVoice.channelId !== null) {
      const ChannelCreateParent = newVoice.channel.parent;
      if (ChannelCreateParent.id === CreateCategoryID) {
        const ParentChildren = ChannelCreateParent.children.cache;
        ParentChildren.forEach((channel) => {
          if (channel === CreateChannelConrolID || channel === CreateChannelID)
            return;
          if (channel.members.size === 0) {
            if (channel.id === CreateChannelID) return;
            channel.delete();
          }
        });
        if (newVoice.channelId !== CreateChannelID) return;
        ChannelCreateParent.children
          .create({
            name: newVoice.member.user.username,
            type: 2,
          })
          .then((channel) => {
            newVoice.setChannel(channel.id);
          });
      }
    } else {
      if (oldVoice.channel.id === CreateChannelID) return;
      const VoiceChannelMemberLength = oldVoice.channel.members.size;
      if (VoiceChannelMemberLength === 0) {
        oldVoice.channel.delete();
      }
    }
  },
};