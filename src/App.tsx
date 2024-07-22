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
    'intro': <p>Congenital engineer • Designed and implemented <a href={'https://idahohahn.com/Resume/geo-flowchart.jpg'} target={'_blank'} rel={'noreferrer'}>home geothermal heating system</a>&nbsp;•&nbsp;Cultivated <em>scores</em> of sourdough bread loaves • Sired the cutest/dorkiest child of the Hahn lineage.<br/><br/><em>Full stack software engineer</em> adept at <em>management</em> • <em>Adapts</em> to times of urgent revenue bleed to methodical epic development • Wholly invested in company, product, and <em>team health</em>.</p>,
    'address': <span>208.ha<span className={'no-spam'}>tldr</span>hn&#64;gmail&#46;com<br />{ process.env.REACT_APP_TEL_ENABLE === 'true' ? obfuscateTelNumber(process.env.REACT_APP_TEL_NUMBER as string) : '' }Boise, Idaho USA</span>,
    'slogan': <p>Heads together <strong>we endeavor.</strong></p>
};

/**
 * Given a string, remove any non-alphanumeric characters and replace with a hyphen.
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
                <section>
                    <div className='background-section'>
                        <h3>Lead Resume Editor</h3>
                        <h4><strong>Sabbatical &amp; Job Search</strong></h4>
                    </div>
                    <div className='work-details'>
                        <p>Course corrected career direction and personal life. Cleared backlog of home maintenance projects. Volunteer work. Portfolio projects to expand skill-set.</p>
                        <div className={'flex'}>
                            <div className={'composable'}>
                                <h5><a href="https://area-man.vercel.app/" target={'_blank'}>Area Man</a></h5>
                                <ul className={'skills-list'}>
                                    <li>Typescript</li>
                                    <li>Next.js</li>
                                    <li>Tailwind</li>
                                    <li>OpenAI</li>
                                </ul>
                                <h5><a href="https://idahohahn.com/BubbleFort/" target={'_blank'}>BubbleFort</a></h5>
                                <ul className="skills-list">
                                    <li>Javascript</li>
                                    <li>D3.js</li>
                                </ul>
                            </div>
                            <div className={'composable'}>
                                <h5><a href="https://github.com/hahn208/aisleSort" target={'_blank'}>Aisle Sort</a></h5>
                                <ul className="skills-list">
                                    <li>Golang</li>
                                </ul>
                                <h5><a
                                    href="https://www.linkedin.com/pulse/code-motion-driving-leds-python-andrew-hahn-zzs3c/"
                                    target={'_blank'}>Code In Motion</a></h5>
                                <ul className="skills-list">
                                    <li>Python</li>
                                    <li>WebSockets</li>
                                    <li>Raspberry Pi + LEDs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
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
function ResumeBio() {
    return (
        <div className={'grid-area-bio'}>
            <>
                {bio.title}
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
            <ul>
                <li>Name: Andrew Hahn</li>
            </ul>
            <ul>
                <li>Email: <span>208ha<span className={'no-spam'}>crlf</span>hn&#64;gmail&#46;com</span></li>
            </ul>
            <ul><li>Location: Boise, ID</li></ul>
            <ul>
                <li>
                    <h2>Work Experience</h2>
                    <ul>
                        { resumeData.workHistory.map((experienceItem, idx) => (experienceItem.shouldDisplay ? <li key={'exp' + idx}>
                            <ul>
                                <li>Company: {experienceItem.title}</li>
                                <li>Job Title: {experienceItem.position}</li>
                                <li>Start Date: {experienceItem.stintDate.split('-')[0]}</li>
                                <li>End Date: {experienceItem.stintDate.split('-')[1]}</li>
                                <li>Role Description: {experienceItem.details.replaceAll('__', '')}</li>
                            </ul>
                        </li> : null))}
                    </ul>
                </li>
            </ul>
            <ul>
                <li>
                    <h2>Education</h2>
                    <ul>
                    {resumeData.education.map((experienceItem) => 
                        <li>
                            <ul>
                                <li>Degree: {experienceItem.stint}</li>
                                <li>Area of Study: {experienceItem.position}</li>
                                <li>University: {experienceItem.title}</li>
                            </ul>
                        </li>
                    )}
                    </ul>
                </li>
            </ul>
            <ul>
                <li>
                    <h2>Skills</h2>
                    <ul style={{ 'listStyleType': 'none' }}>
                        {Object.values(skillBucket).map(s => <li style={{ 'display': 'inline' }}>{s} </li>)}
                    </ul>
                </li>
            </ul>
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
            <ResumeBio/>
            <ResumeExperience/>
            <Sidebar/>
        </div>
    );
}

export default App;