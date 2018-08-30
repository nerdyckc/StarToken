export const required = (value:any) => (value || typeof value === 'number' ? undefined : 'Required');
export const email = (value:string) =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;
export const ytlink = (link:string) => {
    // const match = link.match(/^https:\/\/youtu\.be\/([\w]+)/);
    // const match2 = link.match(/^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/);
    if(link){
        if(!link.match(/^https:\/\/youtu\.be\/([\w]+)/) && !link.match(/^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/)){
            return "Invalid Youtube link";
        }
    }
    return undefined;
}
export const maxChar100 = (value:string) => (value.length<=100?undefined:"Must be shorter than 100 characters");
// export const dateCompare = (dateStr:string) => ();
// export const dateEnd = (dateStr:string) => ()
export const campaignDates:any = {
    startDate : null,
    endDate : null,

    setStartDate: (dateStr:string)=>{
        campaignDates.startDate = new Date(dateStr);
    },
    setEndDate : (dateStr:string)=>{
        campaignDates.endDate = new Date(dateStr);
    },
    validateDates:()=>{
        if(campaignDates.startDate<campaignDates.endDate){
            return undefined;
        }else{
            return "Start date must be earlier than end date"
        }
    },
    validateStartDate: (dateStr:string)=>{
        campaignDates.setStartDate(dateStr);
        if(campaignDates.startDate&&campaignDates.endDate){
            return campaignDates.validateDates()
        }else {
            return "Campaign start and end dates are required";
        }
    },
    validateEndDate: (dateStr:string)=>{
        campaignDates.setEndDate(dateStr);
        if(campaignDates.startDate&&campaignDates.endDate){
            return campaignDates.validateDates()
        }else {
            return "Campaign start and end dates are required";
        }
    }
}