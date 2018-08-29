const moment = require("moment");

module.exports = class CampaignService {
  constructor(knex) {
    this.knex = knex;
  }

  getCampaign(cid, user_id) {
    if (!user_id) {
      if (cid) {
        // return specific campaigns
        let query = this.knex
          .select()
          .from("campaigns")
          .where("id", cid);

        return query;
      } else {
        // return all campaigns
        let query = this.knex.select().from("campaigns");

        return query;
      }
    } else {
      // console.log('getting Watchlisted Campaigns...ID: ', user_id);
      let query = this.knex('watchlists')
      .leftJoin('campaigns', 'watchlists.campaign_id', 'campaigns.id')
      .select('*')
      .where('watchlists.user_id', user_id);

      return query;
    }
  }

  postCampaign(newCampaign, user_id) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex("campaigns").insert({
      title: newCampaign.campaignName,
      short_description: newCampaign.shortDescription,
      project_photo: newCampaign.photo,
      video_url: newCampaign.video,
      long_description: newCampaign.longDescription,
      full_name: newCampaign.fullName,
      email: newCampaign.email,
      company_name: newCampaign.companyName,
      company_legal_form: newCampaign.legalForm,
      company_reg_id: newCampaign.regId,
      company_country: newCampaign.country,
      start_date: newCampaign.startDate,
      end_date: newCampaign.endDate,
      soft_cap: newCampaign.softCap,
      hard_cap: newCampaign.hardCap,
      status: "pending",
      user_id: user_id,
      eth_address: newCampaign.eth_address,
      private_key: newCampaign.private_key,
      token_id: newCampaign.token_id
    });

    return action;
  }

  putCampaign(campaign, cid) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex("campaigns")
      .where("id", cid)
      .update({
        title: campaign.title,
        short_description: campaign.sd,
        project_photo: campaign.photo,
        video_url: campaign.url,
        long_description: campaign.ld,
        full_name: campaign.name,
        email: campaign.email,
        company_name: campaign.company_name,
        company_legal_form: campaign.company_legal_form,
        company_reg_id: campaign.company_reg_id,
        company_country: campaign.company_country,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        soft_cap: campaign.soft_cap,
        hard_cap: campaign.hard_cap,
        status: campaign.status,
        user_id: campaign.user_id,
        eth_address: campaign.eth_address,
        private_key: campaign.private_key,
        token_id: campaign.token_id
      });
    return action;
  }

  deleteCampaign(cid) {
    let action = this.knex("campaigns")
      .where("id", cid)
      .del();
    return action;
  }
};
