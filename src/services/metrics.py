from livekit.agents.metrics import (
    TTSMetrics,
    STTMetrics,
    LLMMetrics,
    VADMetrics,
    EOUMetrics,
    RealtimeModelMetrics,
    InterruptionMetrics,
    AgentMetrics,
)

from rich.console import Console
from rich.table import Table
from rich import box
from datetime import datetime


class ModelMetrics:
    """Handle and display all LiveKit agent metrics types."""

    def __init__(self) -> None:
        self.console = Console()
        self.metrics_history = []

    def process_metric(self, metric: AgentMetrics) -> None:
        """Route metric to appropriate handler based on type."""
        self.metrics_history.append(metric)
        
        if isinstance(metric, TTSMetrics):
            self.tts(metric)
        elif isinstance(metric, STTMetrics):
            self.stt(metric)
        elif isinstance(metric, LLMMetrics):
            self.llm(metric)
        elif isinstance(metric, VADMetrics):
            self.vad(metric)
        elif isinstance(metric, EOUMetrics):
            self.eou(metric)
        elif isinstance(metric, RealtimeModelMetrics):
            self.realtime_model(metric)
        elif isinstance(metric, InterruptionMetrics):
            self.interruption(metric)

    def tts(self, metrics: TTSMetrics) -> None:
        """Extract and log TTS (Text-to-Speech) metrics."""
        table = Table(
            title="[bold blue]TTS Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Label", str(metrics.label))
        table.add_row("Request ID", str(metrics.request_id))
        table.add_row("Timestamp", timestamp)
        table.add_row("TTFB (Time-to-First-Byte)", f"[white]{metrics.ttfb:.4f}[/white]s")
        table.add_row("Duration", f"[white]{metrics.duration:.4f}[/white]s")
        table.add_row("Audio Duration", f"[white]{metrics.audio_duration:.4f}[/white]s")
        table.add_row("Cancelled", "✓" if metrics.cancelled else "✗")
        table.add_row("Characters Count", str(metrics.characters_count))
        table.add_row("Input Tokens", str(metrics.input_tokens))
        table.add_row("Output Tokens", str(metrics.output_tokens))
        table.add_row("Streamed", "✓" if metrics.streamed else "✗")
        table.add_row("Segment ID", str(metrics.segment_id or "N/A"))
        table.add_row("Speech ID", str(metrics.speech_id or "N/A"))
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]TTS Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def stt(self, metrics: STTMetrics) -> None:
        """Extract and log STT (Speech-to-Text) metrics."""
        table = Table(
            title="[bold blue]STT Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Label", str(metrics.label))
        table.add_row("Request ID", str(metrics.request_id))
        table.add_row("Timestamp", timestamp)
        table.add_row("Duration", f"[white]{metrics.duration:.4f}[/white]s")
        table.add_row("Audio Duration", f"[white]{metrics.audio_duration:.4f}[/white]s")
        table.add_row("Input Tokens", str(metrics.input_tokens))
        table.add_row("Output Tokens", str(metrics.output_tokens))
        table.add_row("Streamed", "✓" if metrics.streamed else "✗")
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]STT Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def llm(self, metrics: LLMMetrics) -> None:
        """Extract and log LLM (Large Language Model) metrics."""
        table = Table(
            title="[bold blue]LLM Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Label", str(metrics.label))
        table.add_row("Request ID", str(metrics.request_id))
        table.add_row("Timestamp", timestamp)
        table.add_row("Duration", f"[white]{metrics.duration:.4f}[/white]s")
        table.add_row("TTFT (Time-to-First-Token)", f"[white]{metrics.ttft:.4f}[/white]s")
        table.add_row("Cancelled", "✓" if metrics.cancelled else "✗")
        table.add_row("Completion Tokens", str(metrics.completion_tokens))
        table.add_row("Prompt Tokens", str(metrics.prompt_tokens))
        table.add_row("Prompt Cached Tokens", str(metrics.prompt_cached_tokens))
        table.add_row("Total Tokens", str(metrics.total_tokens))
        table.add_row("Tokens Per Second", f"[white]{metrics.tokens_per_second:.2f}[/white]")
        table.add_row("Speech ID", str(metrics.speech_id or "N/A"))
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]LLM Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def vad(self, metrics: VADMetrics) -> None:
        """Extract and log VAD (Voice Activity Detection) metrics."""
        table = Table(
            title="[bold blue]VAD Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Label", str(metrics.label))
        table.add_row("Timestamp", timestamp)
        table.add_row("Idle Time", f"[white]{metrics.idle_time:.4f}[/white]s")
        table.add_row("Inference Duration Total", f"[white]{metrics.inference_duration_total:.4f}[/white]s")
        table.add_row("Inference Count", str(metrics.inference_count))
        table.add_row("Avg Inference Time", f"[white]{metrics.inference_duration_total / max(metrics.inference_count, 1):.4f}[/white]s")
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]VAD Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def eou(self, metrics: EOUMetrics) -> None:
        """Extract and log EOU (End of Utterance) metrics."""
        table = Table(
            title="[bold blue]EOU Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Timestamp", timestamp)
        table.add_row("End of Utterance Delay", f"[white]{metrics.end_of_utterance_delay:.4f}[/white]s")
        table.add_row("Transcription Delay", f"[white]{metrics.transcription_delay:.4f}[/white]s")
        table.add_row("On User Turn Completed Delay", f"[white]{metrics.on_user_turn_completed_delay:.4f}[/white]s")
        table.add_row("Total Turn Time", f"[white]{metrics.end_of_utterance_delay + metrics.transcription_delay + metrics.on_user_turn_completed_delay:.4f}[/white]s")
        table.add_row("Speech ID", str(metrics.speech_id or "N/A"))
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]EOU Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def realtime_model(self, metrics: RealtimeModelMetrics) -> None:
        """Extract and log Realtime Model metrics."""
        table = Table(
            title="[bold blue]Realtime Model Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Label", str(metrics.label))
        table.add_row("Request ID", str(metrics.request_id))
        table.add_row("Timestamp", timestamp)
        table.add_row("Duration", f"[white]{metrics.duration:.4f}[/white]s")
        table.add_row("Session Duration", f"[white]{metrics.session_duration:.4f}[/white]s")
        table.add_row("TTFT (Time-to-First-Token)", f"[white]{metrics.ttft:.4f}[/white]s")
        table.add_row("Cancelled", "✓" if metrics.cancelled else "✗")
        table.add_row("Input Tokens", str(metrics.input_tokens))
        table.add_row("Output Tokens", str(metrics.output_tokens))
        table.add_row("Total Tokens", str(metrics.total_tokens))
        table.add_row("Tokens Per Second", f"[white]{metrics.tokens_per_second:.2f}[/white]")
        
        # Input token details
        table.add_row("Input Audio Tokens", str(metrics.input_token_details.audio_tokens))
        table.add_row("Input Text Tokens", str(metrics.input_token_details.text_tokens))
        table.add_row("Input Image Tokens", str(metrics.input_token_details.image_tokens))
        table.add_row("Cached Tokens", str(metrics.input_token_details.cached_tokens))
        
        # Output token details
        table.add_row("Output Text Tokens", str(metrics.output_token_details.text_tokens))
        table.add_row("Output Audio Tokens", str(metrics.output_token_details.audio_tokens))
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]Realtime Model Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def interruption(self, metrics: InterruptionMetrics) -> None:
        """Extract and log Interruption Detection metrics."""
        table = Table(
            title="[bold blue]Interruption Detection Metrics Report[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )

        table.add_column("Metric", style="bold green")
        table.add_column("Value", style="yellow")

        timestamp = datetime.fromtimestamp(metrics.timestamp).strftime('%Y-%m-%d %H:%M:%S')

        table.add_row("Type", str(metrics.type))
        table.add_row("Timestamp", timestamp)
        table.add_row("Total Duration", f"[white]{metrics.total_duration:.4f}[/white]s")
        table.add_row("Prediction Duration", f"[white]{metrics.prediction_duration:.4f}[/white]s")
        table.add_row("Detection Delay", f"[white]{metrics.detection_delay:.4f}[/white]s")
        table.add_row("Total Interruptions", str(metrics.num_interruptions))
        table.add_row("Total Backchannels", str(metrics.num_backchannels))
        table.add_row("Total Requests", str(metrics.num_requests))
        
        if metrics.num_requests > 0:
            table.add_row("Avg Prediction Time per Request", 
                         f"[white]{metrics.prediction_duration / metrics.num_requests:.4f}[/white]s")
            table.add_row("Avg Detection Delay per Request", 
                         f"[white]{metrics.detection_delay / metrics.num_requests:.4f}[/white]s")
        
        if metrics.metadata:
            table.add_row("Model Name", str(metrics.metadata.model_name or "N/A"))
            table.add_row("Model Provider", str(metrics.metadata.model_provider or "N/A"))

        self.console.print("\n[bold magenta]Interruption Detection Metrics Collected:[/bold magenta]")
        self.console.print(table)
        self.console.print("\n")

    def get_metrics_summary(self) -> dict:
        """Get a summary of all collected metrics."""
        summary = {
            "total_metrics": len(self.metrics_history),
            "by_type": {},
            "timestamp": datetime.now().isoformat()
        }
        
        for metric in self.metrics_history:
            metric_type = metric.type
            if metric_type not in summary["by_type"]:
                summary["by_type"][metric_type] = 0
            summary["by_type"][metric_type] += 1
        
        return summary

    def print_summary(self) -> None:
        """Print a summary of all collected metrics."""
        summary = self.get_metrics_summary()
        
        table = Table(
            title="[bold blue]Metrics Summary[/bold blue]",
            box=box.ROUNDED,
            highlight=True,
            show_header=True,
            header_style="bold cyan"
        )
        
        table.add_column("Metric Type", style="bold green")
        table.add_column("Count", style="yellow")
        
        for metric_type, count in summary["by_type"].items():
            table.add_row(metric_type, str(count))
        
        table.add_row("[bold]Total[/bold]", f"[bold]{summary['total_metrics']}[/bold]")
        
        self.console.print("\n[bold magenta]Metrics Collection Summary:[/bold magenta]")
        self.console.print(table)
        self.console.print(f"[dim]Summary at {summary['timestamp']}[/dim]\n")