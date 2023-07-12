<?php
class Youtube_Optimized extends \Elementor\Widget_Base
{
	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);
		wp_register_script( 'optimize-youtube', plugin_dir_url(__FILE__) . '../assets/js/optimize_scripts.js', null, '1.0.0', true );
	 }
  
	 public function get_script_depends() {
		 return [ 'optimize-youtube' ];
	 }

	public function get_name()	{ return 'youtube_optimized'; }
	public function get_title(){ return esc_html__('Youtube Optimized', 'elementor-addon'); }
	public function get_icon(){ return 'eicon-youtube'; }
	public function get_categories(){ return ['basic']; }
	public function get_keywords(){ return ['youtube', 'optimized', 'video', 'embed']; }

	//elementor settings
	protected function register_controls()
	{
		$this->start_controls_section(
			'section_title',
			[
				'label' => esc_html__('Video Settings', 'elementor-addon'),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'link',
			[
				'label' => __('Link', 'elementor'),
				'type' => \Elementor\Controls_Manager::URL,
				'placeholder' => __('https://your-link.com', 'elementor'),
				'options' => ['url', 'is_external', 'nofollow'],
				'default' => [
					'url' => '',
				]
			]
		);
		$this->add_control(
			'play_color',
			[
				'label' => esc_html__( 'Play Button Color (#f00)', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::COLOR,
				'default' => '#f00', 
			]
		);
		$this->add_control(
			'start_time',
			[
				'type' => \Elementor\Controls_Manager::NUMBER,
				'label' => esc_html__( 'Start Time (sec)', 'elementor-addon' ),
				'min' => 0,
				'step' => 1,
			]
		);
		$this->add_control(
			'end_time',
			[
				'type' => \Elementor\Controls_Manager::NUMBER,
				'label' => esc_html__( 'End Time (sec)', 'elementor-addon' ),
				'min' => 0,
				'step' => 1,
			]
		);

		$this->add_control(
			'loop',
			[
				'label' => esc_html__( 'Loop', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::SWITCHER,
				'label_on' => esc_html__( 'On', 'optimize' ),
				'label_off' => esc_html__( 'Off', 'optimize' ),
				'return_value' => 'On',
				'default' => 'Off',
			]
		);

		$this->add_control(
			'thumbnail',
			[
				'label' => esc_html__( 'Thumbnail (1280x720)', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::MEDIA,
				'default' => [],
			]
		);

		$this->end_controls_section();
	}

	//elementor frontend
	protected function render()
	{
		$settings = $this->get_settings_for_display();
		$url = $settings['link']['url'];
		$play_color = $settings['play_color'];
		$start_time = $settings['start_time'];
		$end_time = $settings['end_time'];
		$loop = $settings['loop'];
		$thumbnail = $settings['thumbnail']['url'];
		
		//converts youtube link to iframe embed 
		echo preg_replace(
		"/\s*[a-zA-Z\/\/:\.]*youtu(be.com\/watch\?v=|.be\/)([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i",
		"<iframe data-thumbnail='$thumbnail' data-loop='$loop' data-color='$play_color' data-start='$start_time' data-end='$end_time'style='aspect-ratio:16/9;' src=\"//www.youtube.com/embed/$2\" allowfullscreen></iframe>",
		$url
		);
	}
}