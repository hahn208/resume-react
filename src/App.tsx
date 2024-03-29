import {memo, MutableRefObject, ReactNode, useEffect, useRef, useState} from 'react';
import './App.scss';

interface ExperienceType {
    title: string,
    logo?: string,
    position?: string,
    stint: string,
    details: string,
    forceWidow: boolean,
    skills?: string[],
    shouldDisplay: boolean
}

/**
 * Import the work experience json.
 */
const experienceSet: ExperienceType[] = require('./data/experience.json');

/**
 * Import the volunteer experience json.
 */
const volunteer: ExperienceType[] = require('./data/volunteer.json');

/**
 * Import the education experience json.
 */
const education: ExperienceType[] = require('./data/education.json');

/**
 * Import references if the file exists.
 */
let referral:  { [key: string]: string } = {};
try {
    process.env.REACT_APP_ENABLE_REF === 'true' && (referral = require('./data/job_reference.json'));
}
catch (e) { /*noop*/ }

const skillSet: { [key: string]: string[] } = {
    'new': ['Next.js', 'Tailwind', 'Python', 'ChatGPT', 'd3.js'],
    'tools': ['Agile', 'Scrum', 'Docker', 'Jira', 'Azure', 'Salesforce', 'Optimizely', 'AEM', 'GTM', 'Git', 'JetBrains', 'Figma', 'Photoshop']
};


const obfuscateTelNumber = (telNumber: string) => {
    const noSpam = <span className={'no-spam'}>4321</span>;
    
    // Slice number and insert no-spam
    return <span>{telNumber.slice(0, 6)}{noSpam}{telNumber.slice(6)}<br /></span>
}

const bio: { [key: string]: ReactNode } = {
    'title': <h1><span className={'small-caps'}>Andrew</span> <span className={'small-caps'}>Hahn</span> <small>(He/Him)</small></h1>,
    'intro': <p>Congenital engineer • Traversed hundreds of miles of Idaho back-country • Designed and implemented <a href={'https://idahohahn.com/Resume/geo-flowchart.jpg'} target={'_blank'} rel={'noreferrer'}>home geothermal heating system</a>&nbsp;•&nbsp;Cultivated  <em>scores</em> of sourdough bread loaves • Sired the cutest/dorkiest child of the Hahn lineage.</p>,
    'address': <span>208ha<span className={'no-spam'}>asdf</span>hn&#64;gmail&#46;com<br />{ process.env.REACT_APP_TEL_ENABLE === 'true' ? obfuscateTelNumber(process.env.REACT_APP_TEL_NUMBER as string) : '' }Boise, Idaho USA</span>,
    'slogan': <p>Heads together <strong>we endeavor.</strong></p>
};

/**
 * Given a string, remove any non-alphanum characters and replace with a hyphen.
 * @param rawString The unsanitized string.
 * @return string
 */
const makeSafeKeyString = (rawString: string) => rawString.replace(/[^a-z0-9]/gi, '-').toLowerCase();

/**
 * Given a string containing a delimiter, return a replacement with delimited replaced with <em></em>
 * @param rawString
 */
const emphasis = (rawString: string) => {
    const emphArray = rawString.split('__');
    
    let bit = 1;
    
    // "stack" is an agglomerate of the string. The string has been split on __, which is concatenated with an <em>
    //   tag wrapping the text every other time. "bit" toggles if the string should be wrapped or not.
    return emphArray.reduce((stack, s) => { bit = 1-bit; return stack + (!bit ? s : `<em>${s}</em>`); }, '');
};

/**
 * Return the current time, to the minute only, in Boise.
 * @return string
 */
const getIdahoTime = () => new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', year:'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Boise', hour12: true }).format(new Date()); 

/**
 *
 * @param {object} props
 * @constructor
 */
function ResumeItem({experience}: { experience: ExperienceType })
{
    let experienceImage;

    if(experience.logo)
    {
        experienceImage = require(`./images/${experience.logo}`);
        experienceImage = <div className='company-logo'><img src={experienceImage} className={'company-logo_img'} alt={experience.title && experience.title}/></div>;
    }

    return(
        <section className={ experience.forceWidow ? 'print-widow' : undefined }>
            { experience.logo && experienceImage }
            <div className='background-section'>
                { experience.position && <h3>{experience.position}</h3> }
                { experience.title ? <h4><strong>{experience.title}</strong>{ experience.stint ? ' • ' + experience.stint : ''}</h4> : '' }
            </div>
            <div className='work-details'>
                <p dangerouslySetInnerHTML={{ __html: emphasis(experience.details)}}></p>
            </div>
            { experience.skills && <ul className={'skills-list'}>{experience.skills.map(s => <li key={makeSafeKeyString(s)}>{s}</li> )}</ul> }
            { /** If the ignored json file exists, display the referral that matches the company **/ }
            { referral.hasOwnProperty(experience.title) ? <h6 dangerouslySetInnerHTML={{ __html: referral[experience.title]}}></h6> : '' }
        </section>
    );
}

/**
 * ResumeExperience
 * Iterate over the arrays of experience objects.
 *
 * @return JSX
 */
function ResumeExperience()
{
    return(
        <div className={'grid-area-experience'}>
            <>
                <h2><span className={'small-caps'}>Experience</span></h2>
                { experienceSet.map((experienceItem, idx) => (experienceItem.shouldDisplay && <ResumeItem key={makeSafeKeyString(`${experienceItem.title} ${idx}`)} experience={experienceItem}/>)) }
                <p><small>*What do owls eat for breakfast? Mice Krispies.</small></p>
            </>
        </div>
    );
}

/**
 * 
 * @return JSX
 */
function ResumeBio()
{
    return(
        <div className={'grid-area-bio'}>
            <>
                { bio.title }
                <section>
                    <>{/* require().default needed because webpack doesn't load svg file types inherently */}
                        {bio.intro}<p><a href='https://github.com/hahn208/' target='_blank' rel={'noreferrer'}><img src={require('./images/github-ico-dark.svg').default} height={31} width={31} alt={'Github account- Andrew Hahn'} /></a>&nbsp;<a href='https://www.linkedin.com/in/208hahn/' target='_blank' rel={'noreferrer'}><img src={require('./images/linkedin-ico.svg').default} height={32} width={32} alt={'LinkedIn account- Andrew Hahn'} /></a></p>
                    </>
                </section>
            </>
        </div>
    )
}

// TODO: Convert to context? https://react.dev/reference/react/memo#updating-a-memoized-component-using-a-context
const IdahoTime = memo(
    function IdahoTime()
    {
        // Create a ref for the interval timer, so it can be cleared later.
        let idahoTimePendulum: MutableRefObject<NodeJS.Timer | false> = useRef(false);
        
        /* Create a state variable and setter for the time display */
        const [idahoTime, setIdahoTime] = useState(getIdahoTime());
        
        // Avoid rendering the time before hydration. Only run once.
        useEffect(
            () => {
                // In Dev mode this might render twice. Prevent multiple intervals from being created.
                if(!idahoTimePendulum.current)
                    idahoTimePendulum.current = setInterval(() => { setIdahoTime(getIdahoTime()) }, 5000);
                
                // Return a callback function when the component is unmounted so the interval is cleared.
                return () => { clearInterval(~~idahoTimePendulum.current); idahoTimePendulum.current = false; };
            },
            [idahoTime]
        );
        
        return <span className={'d-print-none'}>{ idahoTime }</span>;
    }
)

/**
 * Sidebar
 * Build skillset html. Display profile, skills, volunteer experience, and little bio.
 *
 * @return JSX
 */
function Sidebar()
{
    /**
     * Build an array of html list items containing skills.
     *
     * @param skillSet
     */
    let skillsOutput = (skillSet: string[]) => (
        skillSet.map(
            (skill: string) => <li key={makeSafeKeyString(skill)}>{skill}</li>
        )
    );

    return (
        <div className={'grid-area-sidebar'}>
            <img src={require('./images/profile.jpg')} alt='Andrew Hahn with son' className={'d-print-none'} style={{'width': '100%'}}/>
            <section className={'mb-2 print-t-0'}>
                <div className={'flex gap-4'}>
                    <img src={require('./images/ah.png')} alt={'AH'} id={'AH'}/>
                    <div>
                        <p>
                            {bio.address}<br/>
                            <IdahoTime/>
                            <span className={'d-print'}>Mountain Time Zone</span>
                        </p>
                    </div>
                </div>
                {bio.slogan}
            </section>
            <h5>Personal Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.new)}
            </ul>
            <h5>Tools</h5>
            <ul className='skills-list'>
                {skillsOutput(skillSet.tools)}
            </ul>
            <h2><span className={'small-caps'}>Education</span></h2>
            { education.map(experienceItem => <ResumeItem experience={experienceItem}/>) }
            <h2><span className={'small-caps'}>Volunteer</span> <span className={'small-caps'}>Experience</span></h2>
            { volunteer.map(experienceItem => <ResumeItem experience={experienceItem}/>) }
        </div>
    );
}

/**
 * The main app to display sidebar and content.
 * 
 * @constructor
 */
function App() 
{
    return (
        <div className='App'>
            <Sidebar/>
            <ResumeBio/>
            <ResumeExperience/>
        </div>
    );
}

export default App;