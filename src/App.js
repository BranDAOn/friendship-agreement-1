import React, {useState, useRef} from 'react';
import html2pdf from 'html2pdf.js';

const FriendshipAgreement = () => {
	const [formData, setFormData] = useState({
		date: '',
		quota: 'once per month',
		startDate: '',
		location: '',
		fuckUpActivityDays: '7',
		rescheduleAlternativeDays: '14',
		rescheduleAgreementHours: '48',
		withdrawalNoticeDays: '30',
		probationaryPeriodMonths: '3',
		probationaryActivitiesPerMonth: '2',
		schedulingMinHours: '3',
		amountoftime: 'hours',
		schedulingMaxDays: '10',
		spontaneousActivityNoticeHours: '2',
		cancellationNoticeFraction: '1/3',
		creditCardRouletteFrequency: 'Once',
		creditCardRouletteMonth: 'March',
		rsvpHours: '24',
		bitchBillPercentage: '200',
		excludedAlcohol: ['gin', 'beer', 'wine'],
		negotiationPeriod: '7',
		mediationPeriod: '30',
		appealPeriod: '7',
		appealArbiter: 'tbh whoever you want',
		
	});

	const contentRef = useRef(null);

	const [validExcuses, setValidExcuses] = useState([ "Any nationally-recognized holiday", "An immediate or extended family members' birthday, death or event with prior RSVP", "Illness of a Party", "Death of a Party"]);

	const [newExcuse, setNewExcuse] = useState('');

	const handleAddExcuse = () => {
		if (newExcuse.trim() !== '') {
			setValidExcuses([...validExcuses, newExcuse.trim()]);
			setNewExcuse('');
		}
	};

	const handleRemoveExcuse = (index) => {
		setValidExcuses(validExcuses.filter((_, i) => i !== index));
	};

	const [friends, setFriends] = useState(['']);

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData(prevState => ({
			...prevState, [name]: value
		}));
	};

	const handleFriendChange = (index, value) => {
		const newFriends = [...friends];
		newFriends[index] = value;
		setFriends(newFriends);
	};

	const addFriend = () => {
		setFriends([...friends, '']);
	};

	const removeFriend = (index) => {
		if (friends.length > 1) {
			const newFriends = friends.filter((_, i) => i !== index);
			setFriends(newFriends);
		}
	};

	const generatePDF = () => {
		const content = contentRef.current;

		const pdfContent = content.cloneNode(true);

		pdfContent.querySelectorAll('input, select').forEach(input => {
			const span = document.createElement('span');
			span.textContent = input.value;
			input.parentNode.replaceChild(span, input);
		});

		pdfContent.querySelectorAll('button').forEach(button => {
			button.remove();
		});

		const opt = {
			margin: 15,
			filename: 'friendship_agreement.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};

		html2pdf().from(pdfContent).set(opt).save();
	};

	return (<div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
		<div ref={contentRef} className="pdf-content">
			<h1 className="text-3xl font-bold mb-6 text-center">FRIENDSHIP AGREEMENT</h1>

			<p className="mb-4 avoid-break"><i>[I got really bored and drafted an agreement to force your friends to hang 
				out with you at some defined interval. Hopefully you don't actually need to use this to see your friends;
				however, if you do, you're welcome. Use this agreement at your own risk. I'm not your lawyer, I'm just some guy. 
				I neither represent, warrant, nor promise anything to you by letting you use this agreement. 
				I don't even know if its enforceable, although I think it should be (not legal advice). It's also hilarious.
				Feel free to contribute to the code here: https://github.com/BranDAOn/friendship-agreement-1. Also, if you're
				feeling generous, feel free to tip via Venmo at @Brandon-Ferrick or at brandonf.eth (if you're into crypto).
				Feel free to ping me with any questions at brandon@bhfc.xyz. Enjoy, and don't do anything stupid.]</i></p>
		
			<p className="mb-4 avoid-break">
				This FRIENDSHIP AGREEMENT (this "<u>Agreement</u>") dated as of <input
				type="date"
				name="date"
				value={formData.date}
				onChange={handleInputChange}
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			/> is made by and among the individuals listed immediately below (each, a "<u>Party</u>" and collectively, the "<u>Parties</u>"): 
			</p>

			<div className="mb-4 avoid-break">
				{friends.map((friend, index) => (
					<div key={index} className="flex items-center mb-2">
						<input
							type="text"
							value={friend}
							onChange={(e) => handleFriendChange(index, e.target.value)}
							placeholder={`Friend ${index + 1}`}
							className="border-b border-gray-300 focus:border-blue-500 outline-none mr-2"
						/>
						{friends.length > 1 && (
							<button onClick={() => removeFriend(index)} className="text-red-500">Remove</button>
						)}
					</div>			
				))}
				<button onClick={addFriend} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Add Friend</button>
			</div>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break text-center">RECITALS</h2>

			<p>WHEREAS, the Parties wish to partake in various social activities, including but not limited to dining out,
				to foster and maintain their friendship;</p>

			<p>WHEREAS, the Parties acknowledge the necessity of mutual commitment in time, effort, and financial
				contributions towards planning and executing such activities;</p>

			<p>WHEREAS, the Parties deem it beneficial to outline their intentions and expectations through a formal
				agreement to prevent misunderstandings and ensure commitment;</p>

			<p>NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties agree
				as follows:</p>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break text-center">ARTICLE I</h2>
			<h3 className="text-xl font-bold mb-4 avoid-break text-center"><u>ACTIVITIES AND COMMITMENTS</u></h3>

			<p className="mb-4 avoid-break">
				<strong>Section 1.01. <u>Activities</u>.</strong> The Parties shall engage in social activities for the
				purpose of enjoying each other's camaraderie at a location to be agreed upon pursuant to Section 1.03 and time
				to be agreed upon pursuant to Section 2.01 (an "<u>Activity</u>" or "<u>Activities</u>") at least <input
				type="text"
				name="quota"
				value={formData.quota}
				onChange={handleInputChange}
				placeholder="e.g., once per month"
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			/> (the "<u>Quota</u>"), subject to the terms and conditions of this Agreement, beginning on <input
				type="date"
				name="startDate"
				value={formData.startDate}
				onChange={handleInputChange}
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			/> and ending on a date to be agreed upon pursuant to Article V herein. Except as provided for in Section 1.04,
				Activities shall be attended only by the Parties.
			</p>


			<p className="mb-4 avoid-break">
				<strong>Section 1.02. <u>Good Faith Effort for More Activities</u>.</strong> Each Party agrees to use good
				faith efforts to assist in the coordination of, and attend, at least one additional Activity per month.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.03. <u>Location of Activities</u>.</strong> Each Activity shall take place in <input
				type="text"
				name="location"
				value={formData.location}
				onChange={handleInputChange}
				placeholder="e.g., New York City"
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			/> (each, a "<u>Location</u>"), subject to the terms and condition of Section 2.01 herein. For the avoidance of doubt,
				if the Parties agree to meet at a venue that does not qualify as a Location in accordance with this Section 1.03,
				such activity will not be governed by the terms and conditions of this Agreement (a “Non-Qualifying Activity”);
				provided, however, that if the Parties unanimously agree to consider a Non-Qualifying Activity as an Activity,
				then such meeting shall constitute an Activity.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.04. <u>Guests</u>.</strong> Guests are not permitted to attend Activities or Fuck-Up
				Activities unless unanimously agreed by the Parties. Timing and notice for proposals to invite a guest must
				occur in accordance with Section 2.01.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.05. <u>Fuck-Up Activities</u>.</strong> In the event the Quota is not met in a particular
				month, the Parties will get their shit together and meet for an Activity as soon as reasonably
				practicable; <i>provided</i>, <i>however</i>, that Fuck-Up Activities must occur within <input
				type="number"
				name="fuckUpActivityDays"
				value={formData.fuckUpActivityDays}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days of the end of the month for which the Quota was not met. (a "<u>Fuck-Up Activities</u>"). Fuck-Up
				Activities shall be subject to the same terms and conditions under this Agreement as if they were an Activity.
				Fuck-Up Activities shall not count towards any Quotas.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.06. <u>Rescheduling Activities</u>.</strong> In the event an Activity needs to be
				rescheduled, the Parties shall follow the same process outlined in Section 2.01 for scheduling. The Party
				requesting the reschedule shall propose at least three (3) alternative dates and times within the next <input
				type="number"
				name="rescheduleAlternativeDays"
				value={formData.rescheduleAlternativeDays}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days. The Parties shall then use good faith efforts to agree on a new date and time for the Activity within <input
				type="number"
				name="rescheduleAgreementHours"
				value={formData.rescheduleAgreementHours}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> hours of the rescheduling request. If no agreement is reached, the Activity shall be considered cancelled
				and subject to the provisions of Section 1.05.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.07. <u>Voluntary Withdrawal</u>.</strong> Any Party may voluntarily withdraw from this
				Agreement by providing written notice to all other Parties at least <input
				type="number"
				name="withdrawalNoticeDays"
				value={formData.withdrawalNoticeDays}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days prior to the intended withdrawal date. The withdrawing Party shall be responsible for participating in
				all scheduled Activities up to the withdrawal date and shall settle any outstanding financial obligations
				related to past Activities. Upon withdrawal, the Party shall cease to be bound by the terms of this Agreement
				but shall maintain the confidentiality of any private matters discussed during Activities. Also, the
				withdrawing Party shall perpetually be known as a pussy.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 1.08. <u>New Member Integration</u>.</strong> The addition of new members to the group
				requires unanimous approval from all existing Parties. Upon approval, new members shall undergo a <input
				type="number"
				name="probationaryPeriodMonths"
				value={formData.probationaryPeriodMonths}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> month probationary period. During this period, the new member shall attend at least <input
				type="number"
				name="probationaryActivitiesPerMonth"
				value={formData.probationaryActivitiesPerMonth}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> Activities per month. At the end of the probationary period, existing Parties shall vote on the new member's
				full integration. A unanimous vote is required for the new member to be fully admitted to the group. Upon full
				admission, the new member shall become a Party to this Agreement by signing an addendum.
			</p>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break text-center">ARTICLE II</h2>
			<h3 className="text-xl font-bold mb-4 avoid-break text-center"><u>TIMING AND NOTICE</u></h3>

			<p className="mb-4 avoid-break">
				<strong>Section 2.01. <u>Scheduling</u>.</strong> Activities, including time and Location, shall be proposed
				by a Party to each other Party by delivery of a group-text message, the recipients of which shall be
				exclusively the Parties (each, a "<u>Text</u>"), at a time at least <input
				type="number"
				name="schedulingMinHours"
				value={formData.schedulingMinHours}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> <input
				type="text"
				name="amountoftime"
				value={formData.amountoftime}
				onChange={handleInputChange}
				className="w-16 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> prior to the proposed time of an Activity and no more than <input
				type="number"
				name="schedulingMaxDays"
				value={formData.schedulingMaxDays}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> <input
				type="text"
				name="amountoftime"
				value={formData.amountoftime}
				onChange={handleInputChange}
				className="w-16 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> prior to the proposed time of an Activity. No Party will propose an Activity that they know or
				reasonably should know another Party cannot attend (including, without limitation, by reason of forgetting
				that a Party told another Party about a preplanned activity and the forgetting party never saved it in your
				calendar or committed it to memory). The time at which an Activity occurs is referred to in this Agreement as
				the "<u>Proposed Time</u>." The time at which a Text is delivered is referred to in this Agreement as the "<u>Time
				of Text</u>."
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 2.02. <u>Spontaneous Activities</u>.</strong> In addition to regularly scheduled Activities,
				any Party may propose a spontaneous or unplanned Activity by sending a Text to all other Parties at any time.
				Such spontaneous Activities shall be subject to the same terms and conditions as regular Activities, except
				that the minimum notice period shall be reduced to <input
				type="number"
				name="spontaneousActivityNoticeHours"
				value={formData.spontaneousActivityNoticeHours}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> <input
				type="text"
				name="amountoftime"
				value={formData.amountoftime}
				onChange={handleInputChange}
				className="w-16 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> prior to the proposed time of the Activity. Participation in spontaneous Activities is voluntary and
				shall not count towards the monthly Quota unless unanimously agreed by the Parties but may count towards the
				good faith effort for additional Activities as described in Section 1.02.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 2.03. <u>Cancellations and Notice of Cancellations</u>.</strong> A party may cancel an
				Activity and/or withdraw from attending an Activity by Text indicating that Party's intent to cancel and/or
				withdraw (a "<u>Cancellation</u>"). Notice of any Cancellation must be delivered within a period not to be
				shorter than <input
				type="text"
				name="cancellationNoticeFraction"
				value={formData.cancellationNoticeFraction}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> of the time between the Proposed Time and the Time of Text. Penalties for Cancellations shall be imposed in
				accordance with Article IV of this Agreement.
			</p>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break">ARTICLE III</h2>
			<h3 className="text-xl font-bold mb-4 avoid-break"><u>FINANCIAL MATTERS</u></h3>

			<p className="mb-4 avoid-break">
				<strong>Section 3.01. <u>Payment for Activities</u>.</strong> Except as provided for in Article IV, each Party
				and any guest of that Party (each, a "<u>Fren</u>") will pay for their share of any cost, bill or fee
				associated with an Activity in accordance with this Article III. In the event that the Frens have an Activity
				at a Location where all food and drinks are shared (a "<u>Communal Meal</u>"), the Frens will split the bill
				evenly. In all other circumstances, the Frens will determine at the Activity how to split the bill reasonably.
				Payment may be made by (i) the Frens all providing a form of payment, including but not limited to cash,
				debit, and credit cards, (ii) in accordance with Section 3.02 or (iii) in accordance with Section 3.03.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 3.02. <u>Credit Card Points</u>.</strong> For each Activity, any Party desiring to pay for an
				entire Activity with their credit card to accumulate credit card points and seek reimbursement from other
				Frens for their pro rata portion of any amounts paid shall play Rock-Paper-Scissors (<i>with "says Shoot"</i>)
				with each other Party similarly willing to pay and any Party that wins two (2) out of three (3) rounds of
				Rock-Paper-Scissors (<i>with "says Shoot"</i>) at an Activity where such game of Rock-Paper-Scissors (<i>with
				"says Shoot"</i>) is played will be entitled to pay for that Activity with their credit card (the "<u>Winner-Winner
				Chicken Dinner</u>"). Frens shall reimburse the Winner-Winner Chicken Dinner for their pro rata portion of any
				cost, bill, or fee associated with an Activity in accordance with Section 3.01. For the avoidance of doubt,
				guests shall not be allowed to participate in Rock-Paper-Scissors.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 3.03. <u>Credit Card Roulette</u>.</strong> <input
				type="text"
				name="creditCardRouletteFrequency"
				value={formData.creditCardRouletteFrequency}
				onChange={handleInputChange}
				placeholder="Once, twice"
				className="w-20 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> per year, in <select
				name="creditCardRouletteMonth"
				value={formData.creditCardRouletteMonth}
				onChange={handleInputChange}
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			>
				<option value="January">January</option>
				<option value="February">February</option>
				<option value="March">March</option>
				<option value="April">April</option>
				<option value="May">May</option>
				<option value="June">June</option>
				<option value="July">July</option>
				<option value="August">August</option>
				<option value="September">September</option>
				<option value="October">October</option>
				<option value="November">November</option>
				<option value="December">December</option>
			</select> of each year, the Parties will play a game of chance to determine which of the Parties will be
				required to pay the entire cost, bill, or expense of an Activity without seeking reimbursement from the other
				Parties ("<u>Credit Card Roulette</u>"). Credit Card Roulette shall proceed as follows: each Party will put
				one credit card into a pile on the bill received from a Restaurant from which the waiter or waitress serving
				the Munchers will pick one credit card at random and the owner of the credit card that is picked from the pile
				loses and will be required to pay for the entire Activity bill.
			</p>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break">ARTICLE IV</h2>
			<h3 className="text-xl font-bold mb-4 avoid-break"><u>PENALTIES</u></h3>

			<p className="mb-4 avoid-break">
				<strong>Section 4.01. <u>Being a Lil' Bitch</u>.</strong> In the event a Party fails to attend two consecutive
				Activities without a Valid Excuse (as described in this Section 4.01), they shall be labelled a "<u>Lil'
				Bitch</u>" until such time that the Lil' Bitch attends a future Activity. A "Valid Excuse" is an excuse that
				permits an absence from an Activity without exposure to any associated penalties under this Article IV are
				limited to the following:
			</p>
			<ul className="list-disc pl-8 mb-4 avoid-break">
				{validExcuses.map((excuse, index) => (<li key={index} className="mb-2">
					{excuse}
					<button onClick={() => handleRemoveExcuse(index)} className="ml-2 text-red-500">Remove</button>
				</li>))}
			</ul>
			<div className="mb-4 avoid-break">
				<input
					type="text"
					value={newExcuse}
					onChange={(e) => setNewExcuse(e.target.value)}
					placeholder="Add new valid excuse"
					className="border p-2 mr-2"
				/>
				<button onClick={handleAddExcuse} className="bg-blue-500 text-white px-4 py-2 rounded">Add Excuse</button>
			</div>

			<p className="mb-4 avoid-break">
				<strong>Section 4.02. <u>Lil Bitch Penalties</u>.</strong> Upon attendance by a Lil' Bitch to an Activity (the
				"<u>Homecoming</u>"), the Lil' Bitch will be required to pay <input
				type="number"
				name="bitchBillPercentage"
				value={formData.bitchBillPercentage}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/>% of the amount they would otherwise owe pursuant to Section 3.01 (the "<u>Bitch Bill</u>"). The Bitch Bill
				shall subsidize the amounts owed by all Frens attending the Homecoming.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 4.03. <u>Anti-Douchebaggery</u>.</strong> Notwithstanding any other provision of this Article
				IV, the parties will not be a Douchebag at the Homecoming of a Lil' Bitch. Being a "Douchebag" includes, but
				is not limited to, ordering an exorbitant amount of items off of the Restaurant menu in an attempt to force
				the Lil' Bitch to pay a high Bitchboy Bill; <i>provided</i>, <i>however</i>, that a Party will not be a
				douchebag if they make fun of, harass, or otherwise demean or demoralize the Lil' Bitch for their lack of
				attendance to Activities.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 4.04. <u>Fuck-Up Activity Penalties</u>.</strong> In the event a Fuck-Up Activity occurs, each
				of the Parties (and any guests) will each take one shot of palatable and consumable alcohol, excluding <input
				type="text"
				name="excludedAlcohol"
				value={formData.excludedAlcohol.join(', ')}
				onChange={(e) => handleInputChange({
					target: {
						name: 'excludedAlcohol', value: e.target.value.split(',').map(item => item.trim())
					}
				})}
				className="w-40 border-b border-gray-300 focus:border-blue-500 outline-none"
			/>.
			</p>

			<h2 className="text-2xl font-bold mt-6 mb-4 avoid-break">ARTICLE V</h2>
			<h3 className="text-xl font-bold mb-4 avoid-break"><u>MISCELLANEOUS</u></h3>

			<p className="mb-4 avoid-break">
				<strong>Section 5.01. <u>Assignments</u>.</strong> The Parties shall not assign or transfer his or her rights
				or duties without the express written consent of each other Party. Any transfer or assignment made without the
				consent of each other Party shall not relieve the transferor or assignor of his or her duties or obligations
				under this agreement.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 5.02 <u>Dispute Resolution</u>.</strong> Any dispute arising out of or relating to this
				Agreement shall be resolved through the following process: The parties shall first attempt to resolve the
				dispute through good-faith negotiations for a period of <input
				type="number"
				name="negotiationPeriod"
				value={formData.negotiationPeriod}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days; if negotiations fail, the parties shall engage in mediation with a mutually agreed-upon mediator for a
				period not to exceed <input
				type="number"
				name="mediationPeriod"
				value={formData.mediationPeriod}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days. If mediation is unsuccessful, the dispute shall be submitted to binding arbitration before <input
				type="text"
				name="arbitrator"
				value={formData.arbitrator}
				onChange={handleInputChange}
				placeholder="name of one of the Parties' parents"
				className="w-64 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> for final adjudicative authority in accordance with whatever reasonable process and procedure such
				arbitrator deems appropriate. Any Party may appeal the decision by the arbitrator within <input
				type="number"
				name="appealPeriod"
				value={formData.appealPeriod}
				onChange={handleInputChange}
				className="w-8 border-b border-gray-300 focus:border-blue-500 outline-none"
			/> days of its issuance by submitting a written notice of appeal to all other Parties' and <input
				type="text"
				name="arbitrator"
				value={formData.arbitrator}
				onChange={handleInputChange}
				placeholder="name of one of the Parties' parents"
				className="w-64 border-b border-gray-300 focus:border-blue-500 outline-none"
			/>. The appeal shall be heard by a person chosen by <input
				type="text"
				name="arbitrator"
				value={formData.arbitrator}
				onChange={handleInputChange}
				placeholder="name of one of the Parties' parents"
				className="w-64 border-b border-gray-300 focus:border-blue-500 outline-none"
			/>. The decision of the appeal shall be final and binding on
				all Parties.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 5.03. <u>Termination</u>.</strong> This Agreement may be terminated and all obligations,
				rights and duties herein shall cease to have legal effect upon the unanimous written consent of the Parties.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 5.04. <u>Governing Law</u>.</strong> This Agreement shall be governed by, and construed in
				accordance with, the laws of the State of <select
				name="governingState"
				value={formData.governingState}
				onChange={handleInputChange}
				className="border-b border-gray-300 focus:border-blue-500 outline-none"
			>
				<option value="New York">New York</option>
				<option value="California">California</option>
				<option value="Texas">Texas</option>
				<option value="Florida">Florida</option>
				<option value="Illinois">Illinois</option>
				<option value="Pennsylvania">Pennsylvania</option>
				<option value="Ohio">Ohio</option>
				<option value="Georgia">Georgia</option>
				<option value="North Carolina">North Carolina</option>
				<option value="Michigan">Michigan</option>
				<option value="New Jersey">New Jersey</option>
				<option value="Virginia">Virginia</option>
				<option value="Washington">Washington</option>
				<option value="Arizona">Arizona</option>
				<option value="Massachusetts">Massachusetts</option>
				<option value="Tennessee">Tennessee</option>
				<option value="Indiana">Indiana</option>
				<option value="Missouri">Missouri</option>
				<option value="Maryland">Maryland</option>
				<option value="Wisconsin">Wisconsin</option>
				<option value="Colorado">Colorado</option>
				<option value="Minnesota">Minnesota</option>
				<option value="South Carolina">South Carolina</option>
				<option value="Alabama">Alabama</option>
				<option value="Louisiana">Louisiana</option>
				<option value="Kentucky">Kentucky</option>
				<option value="Oregon">Oregon</option>
				<option value="Oklahoma">Oklahoma</option>
				<option value="Connecticut">Connecticut</option>
				<option value="Iowa">Iowa</option>
				<option value="Mississippi">Mississippi</option>
				<option value="Arkansas">Arkansas</option>
				<option value="Utah">Utah</option>
				<option value="Nevada">Nevada</option>
				<option value="Kansas">Kansas</option>
				<option value="New Mexico">New Mexico</option>
				<option value="Nebraska">Nebraska</option>
				<option value="West Virginia">West Virginia</option>
				<option value="Idaho">Idaho</option>
				<option value="Hawaii">Hawaii</option>
				<option value="Maine">Maine</option>
				<option value="New Hampshire">New Hampshire</option>
				<option value="Rhode Island">Rhode Island</option>
				<option value="Montana">Montana</option>
				<option value="Delaware">Delaware</option>
				<option value="South Dakota">South Dakota</option>
				<option value="North Dakota">North Dakota</option>
				<option value="Alaska">Alaska</option>
				<option value="Vermont">Vermont</option>
				<option value="Wyoming">Wyoming</option>
			</select>, regardless of the laws that might otherwise govern under applicable principles of conflicts of laws
				thereof.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 5.05 <u>Severability</u>.</strong> If any provision of this Agreement or the application of
				any such provision to any person or circumstance shall be held invalid, illegal or unenforceable in any
				respect by a court of competent jurisdiction, such invalidity, illegality or unenforceability shall not affect
				the validity, legality or enforceability of any other provision hereof, and the invalidity of a particular
				provision in a particular jurisdiction shall not invalidate such provision in any other jurisdiction.
			</p>

			<p className="mb-4 avoid-break">
				<strong>Section 5.06 <u>Amendments</u>.</strong> Any proposed amendment to this Agreement must be approved by
				unanimous consent of all Parties. Each Party shall have one (1) vote in the amendment process.
			</p>

			<div className="mt-8">
				<p className="font-bold avoid-break">In witness whereof, the parties have executed this agreement on the day and year first
					written above.</p>
				{friends.filter(f => f).map((friend, index) => (
					<div key={index} className="mt-4 pb-4 border-b border-gray-300">
						<p>Print Name: {friend}</p>
						<p className="mt-4 avoid-break">Signature: ____________________</p>
					</div>
				))}
			</div>
		</div>

		<button
			onClick={generatePDF}
			className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
		>
			Generate PDF
		</button>
	</div>)
		;
};

export default FriendshipAgreement;
