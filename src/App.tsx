import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import resume from './data/resume.json';
import './App.scss';

interface ExperienceType {
    title: string,
    logo?: string,
    position?: string,
    stint: string,
    stintDate: string,
    details: string,
    forceWidow: boolean,
    skills?: string[],
    shouldDisplay: boolean
}

interface ResumeData {
    projectSkills: string[],
    tools: string[],
    workHistory: ExperienceType[],
    education: ExperienceType[],
    volunteer: ExperienceType[]
}

let resumeData = resume as ResumeData;

/**
 * Import references if the file exists.
 */
let referral:  { [key: string]: string } = {};
try {
    process.env.REACT_APP_ENABLE_REF === 'true' && (referral = require('./data/job_reference.json'));
}
catch (e) { /*noop*/ }

const obfuscateTelNumber = (telNumber: string) => {
    const noSpam = <span className={'no-spam'}>4321</span>;
    
    // Slice number and insert no-spam
    return <span>{telNumber.slice(0, 6)}{noSpam}{telNumber.slice(6)}<br /></span>
}

const bio: { [key: string]: ReactNode } = {
    'title': <h1><span className={'small-caps'}>Andrew</span> <span className={'small-caps'}>Hahn</span> <small>(He/Him)</small></h1>,
    'intro': <p>Congenital engineer • Traversed hundreds of miles of Idaho back-country • Designed and implemented <a href={'https://idahohahn.com/Resume/geo-flowchart.jpg'} target={'_blank'} rel={'noreferrer'}>home geothermal heating system</a>&nbsp;•&nbsp;Cultivated  <em>scores</em> of sourdough bread loaves • Sired the cutest/dorkiest child of the Hahn lineage.</p>,
    'address': <span>208.ha<span className={'no-spam'}>tldr</span>hn&#64;gmail&#46;com<br />{ process.env.REACT_APP_TEL_ENABLE === 'true' ? obfuscateTelNumber(process.env.REACT_APP_TEL_NUMBER as string) : '' }Boise, Idaho USA</span>,
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
    
    // Check that there was an even number of separators.
    if (emphArray.length % 2 === 0)
    {
        // There was an unclosed emphasis attempt. Return the text without formatting.
        return rawString.replace('__', '');
    }
    
    // "stack" is an agglomerate of the string. The string has been split on __, which is concatenated with an <em>
    //   tag wrapping the text every other time. "bit" toggles if the string should be wrapped or not.
    return emphArray.reduce((stack, s) => { bit = 1-bit; return stack + (!bit ? s : `<em>${s}</em>`); }, '');
};

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
            { /** If the json file exists, display the referral that matches the company **/ }
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
                { resumeData.workHistory.map((experienceItem, idx) => (experienceItem.shouldDisplay && <ResumeItem key={makeSafeKeyString(`${experienceItem.title} ${idx}`)} experience={experienceItem}/>)) }
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

function IdahoTime() {
    /**
     * Return the current time, to the minute only, in Boise.
     * @return string
     */
    const getIdahoTime = useCallback(() => new Intl.DateTimeFormat('en-GB', { month: 'short', day: 'numeric', year:'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'America/Boise', hour12: true }).format(new Date()), []);

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
            return () => { 
                if(idahoTimePendulum.current) clearInterval(idahoTimePendulum.current);
                idahoTimePendulum.current = false;
            };
        },
        [getIdahoTime]
    );
    
    return <span className={'d-print-none'}>{ idahoTime }</span>;
}

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
            <h5>Project Skills</h5>
            <ul className='skills-list'>
                {skillsOutput(resumeData.projectSkills)}
            </ul>
            <h5>Tools</h5>
            <ul className='skills-list'>
                {skillsOutput(resumeData.tools)}
            </ul>
            <h2><span className={'small-caps'}>Education</span></h2>
            { resumeData.education.map(experienceItem => <ResumeItem experience={experienceItem}/>) }
            <h2><span className={'small-caps'}>Volunteer</span> <span className={'small-caps'}>Experience</span></h2>
            { resumeData.volunteer.map(experienceItem => <ResumeItem experience={experienceItem}/>) }
        </div>
    );
}

let PlainText = () => {
    const skillBucket: { [key: string]: string } = {};
    
    for (const workItem of resumeData.workHistory) {
        for (const skillItem of workItem.skills!) {
            skillBucket[skillItem] = skillItem;
        }
    }
    
    for (const skillItem of resumeData.projectSkills) {
        skillBucket[skillItem] = skillItem;
    }
    
    return (
        <div>
            <dl>
                <dt>Name</dt>
                <dd>Andrew Hahn</dd>
            </dl>
            <dl>
                <dt>Email</dt>
                <dd><span>208ha<span className={'no-spam'}>crlf</span>hn&#64;gmail&#46;com</span></dd>
            </dl>
            <dl>
                <dt>Work Experience</dt>
                <dd>
                    <ul>
                        { resumeData.workHistory.map((experienceItem, idx) => (experienceItem.shouldDisplay ? <li key={'exp' + idx}>
                            <dl>
                                <dt>Job Title</dt>
                                <dd>{experienceItem.position}</dd>
                                <dt>Company</dt>
                                <dd>{experienceItem.title}</dd>
                                <dt>Location</dt>
                                <dd></dd>
                                <dt>Start Date</dt>
                                <dd>{experienceItem.stintDate.split('-')[0]}</dd>
                                <dt>End Date</dt>
                                <dd>{experienceItem.stintDate.split('-')[1]}</dd>
                                <dt>Role Description</dt>
                                <dd>{experienceItem.details.replaceAll('__', '')}</dd>
                            </dl>
                        </li> : null))}
                    </ul>
                </dd>
            </dl>
            <dl>
                <dt>Education</dt>
                <dd>
                {resumeData.education.map((experienceItem) => 
                    <dl>
                        <dt>Degree</dt>
                        <dd>{experienceItem.stint}</dd>
                        <dt>Area of Study</dt>
                        <dd>{experienceItem.position}</dd>
                        <dt>University</dt>
                        <dd>{experienceItem.title}</dd>
                    </dl>
                )}
                </dd>
            </dl>
            <dl>
                <dt>Skills</dt>
                <dl>
                    <ul>
                        {Object.values(skillBucket).map(s => <li>{s}</li>)}
                    </ul>
                </dl>
            </dl>
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
    // Yes, this is ugly, but so is Workday.
    if(window.location.search === '?plaintext')
        return <PlainText></PlainText>
    
    return (
        <div className='App'>
            <Sidebar/>
            <ResumeBio/>
            <ResumeExperience/>
        </div>
    );
}

export default App;